import { DateTime } from 'luxon';
import { readdirSync, unlinkSync } from 'fs';

import { AppConfig } from '@server/config';
import { ZipFileTarget } from '@server/core';

export class BatchTarget {
  get logFiles() {
    const appConfig = new AppConfig();

    const map: Record<string, ZipFileTarget[]> = {};

    for (const filename of readdirSync('./logs')) {
      const path = `./logs/${filename}`;
      const filenames = filename.split('.');
      const extension = filenames.pop() ?? '';

      if (filename.startsWith('.')) {
        unlinkSync(path);
        continue;
      }

      if (['verbose', 'warn', 'error', 'log'].includes(extension) === false) {
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

      if (prefix !== appConfig.getContainerPrefix()) {
        continue;
      }

      const zipname = `${date.toSQLDate()}.zip`;

      if (map[zipname] == null) {
        map[zipname] = [];
      }

      map[zipname].push({ name: [prefix, extension].join('.'), path, remove: true });
    }

    return map;
  }
}
