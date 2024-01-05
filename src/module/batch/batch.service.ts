import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { DataSource } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { BatchQuery, SlackEvent } from '@server/common';
import { S3Service, SlackWebhookSendErrorDto, ZipService } from '@server/core';

import { BatchTarget } from './batch.target';
import { LogUploadBatchFailError } from './errors';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly eventEmitter: EventEmitter2,
  ) {
    if (existsSync('./logs') === false) {
      mkdirSync('./logs');
    }

    if (existsSync('./temp') === false) {
      mkdirSync('./temp');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM, { timeZone: process.env.TZ })
  async uploadLogFiles() {
    await this.dataSource
      .transaction(async (em) => {
        const batchQuery = new BatchQuery(em);
        const batch = await batchQuery.findLogBatch();

        if (batch == null) {
          return;
        }

        if (batch.working) {
          return;
        }

        await batchQuery.updateBatchWorkingByKey(batch.key, true);

        const files = new BatchTarget().getLogFiles();
        const zipService = new ZipService();
        const s3Service = new S3Service(this.eventEmitter);

        for (const zipname of Object.keys(files)) {
          const zip = await zipService.zip(`./temp/${zipname}`, { files: files[zipname] });
          const path = s3Service.getLogPath(zipname);
          await s3Service.upload('log', path, zip);

          unlinkSync(zip);
        }

        await batchQuery.updateBatchWorkingByKey(batch.key, false);
      })
      .catch((e) => {
        const context = [BatchService.name, this.uploadLogFiles.name].join('.');
        const error = new LogUploadBatchFailError(e);

        this.logger.error(error.name, error.cause, context);

        this.eventEmitter.emit(SlackEvent.Webhook, new SlackWebhookSendErrorDto(error));
      });
  }
}
