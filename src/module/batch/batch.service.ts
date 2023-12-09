import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { DataSource } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { UploadLogBatchQuery } from '@server/common';
import { S3Service, ZipService } from '@server/core';

import { BatchTarget } from './batch.target';
import { LogUploadBatchFailError } from './errors';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(private readonly dataSource: DataSource) {
    if (existsSync('./logs') === false) {
      mkdirSync('./logs');
    }

    if (existsSync('./temp') === false) {
      mkdirSync('./temp');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, { timeZone: process.env.TZ })
  async uploadLogFiles() {
    await this.dataSource
      .transaction(async (em) => {
        const uploadLogBatchQuery = new UploadLogBatchQuery(em);
        const uploadLogBatch = await uploadLogBatchQuery.findLogBatch();

        if (uploadLogBatch == null) {
          return;
        }

        if (uploadLogBatch.working) {
          return;
        }

        await uploadLogBatchQuery.updateLogBatch(true);

        const targets = new BatchTarget().logFiles;
        const zipService = new ZipService();
        const s3Service = new S3Service();

        for (const zipname of Object.keys(targets)) {
          const zip = await zipService.zip(`./temp/${zipname}`, { files: targets[zipname] });
          const path = s3Service.getLogPath(zipname);
          await s3Service.upload('log', path, zip);

          unlinkSync(zip);
        }

        await uploadLogBatchQuery.updateLogBatch(false);
      })
      .catch((e) => {
        const context = [BatchService.name, this.uploadLogFiles.name].join('.');
        const error = new LogUploadBatchFailError(e);

        this.logger.error(error.name, error.details, context);
      });
  }
}
