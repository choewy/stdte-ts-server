import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { AppConfig } from '@server/config';
import { UploadLogBatchQuery } from '@server/common';
import { S3Service, ZipFileTarget, ZipService } from '@server/core';

import { LogUploadBatchFailError } from './errors';

@Injectable()
export class BatchService {
  private readonly appConfig = new AppConfig();

  private readonly logger = new Logger(BatchService.name);

  constructor(private readonly dataSource: DataSource) {
    if (existsSync('./logs') === false) {
      mkdirSync('./logs');
    }

    if (existsSync('./temp') === false) {
      mkdirSync('./temp');
    }
  }

  private getLogFileZipTargets() {
    const map: Record<string, ZipFileTarget[]> = {};

    for (const filename of readdirSync('./logs')) {
      const filenames = filename.split('.');
      const name = filenames.pop() ?? '';

      if (['verbose', 'warn', 'error', 'log'].includes(name) === false) {
        continue;
      }

      const date = DateTime.fromFormat(filenames.pop() ?? '', 'yyyy-MM-dd');

      if (date.isValid === false) {
        continue;
      }

      const diff = Math.ceil(date.diffNow('days').get('days'));

      if (diff === 0) {
        continue;
      }

      const prefix = filenames.pop();

      if (prefix !== this.appConfig.getLogFilePrefix()) {
        continue;
      }

      const zipname = `${date.toSQLDate()}.zip`;

      if (map[zipname] == null) {
        map[zipname] = [];
      }

      const path = `./logs/${filename}`;

      map[zipname].push({ name, path, remove: true });
    }

    return map;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, { timeZone: process.env.TZ })
  async uploadLogFiles() {
    await this.dataSource
      .transaction(async (em) => {
        const uploadLogBatchQuery = new UploadLogBatchQuery(em);
        const uploadLogBatch = await uploadLogBatchQuery.findLogBatch();

        if (uploadLogBatch.working) {
          return;
        }

        await uploadLogBatchQuery.updateLogBatch(true);

        const map = this.getLogFileZipTargets();
        const zipService = new ZipService();
        const s3Service = new S3Service();

        for (const zipname of Object.keys(map)) {
          const zip = await zipService.zip(`./temp/${zipname}`, { files: map[zipname] });
          const path = s3Service.getLogPath(zipname);
          await s3Service.upload('log', path, zip);

          unlinkSync(zip);
        }

        await uploadLogBatchQuery.updateLogBatch(false);
      })
      .catch((e) => {
        this.logger.error(
          LogUploadBatchFailError.name,
          { name: e?.name, message: e?.message, cause: e?.cause },
          this.uploadLogFiles.name,
        );
      });
  }
}
