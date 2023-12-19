import { DateTime } from 'luxon';

import { DownloadFormat, DownloadMimetype } from '../enums';

export class DownloadDto {
  url: string;
  filename: string;

  constructor(buffer: Buffer, format: DownloadFormat, filename: string) {
    let mimetype: DownloadMimetype;

    switch (format) {
      case DownloadFormat.Xlsx:
        mimetype = DownloadMimetype.Xlsx;
        break;

      case DownloadFormat.Csv:
        mimetype = DownloadMimetype.Csv;
        break;

      case DownloadFormat.Json:
        mimetype = DownloadMimetype.Json;
        break;
    }

    this.url = `data:${mimetype};base64,${buffer.toString('base64')}`;
    this.filename = `${filename}-${DateTime.local().toFormat('yyyyMMdd')}.${format}`;
  }
}
