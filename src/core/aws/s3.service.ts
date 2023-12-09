import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

import { Logger } from '@nestjs/common';

import { S3Bucket } from '@server/common';
import { AppConfig, AwsConfig, SystemConfig } from '@server/config';

import { S3UploadFailError } from './errors';

export class S3Service {
  private readonly logger = new Logger(S3Service.name);

  private readonly awsConfig = new AwsConfig();

  private readonly client = new S3({
    region: this.awsConfig.getS3Region(),
    credentials: this.awsConfig.getCredentials(),
    forcePathStyle: true,
  });

  getLogPath(filename: string) {
    return [new AppConfig().getName(), new SystemConfig().getNodeEnv(), filename].join('/');
  }

  async upload(
    bucket: keyof S3Bucket,
    path: string,
    body: string | Uint8Array | Buffer | Readable,
    contentType?: string,
  ) {
    const command = new PutObjectCommand({
      Bucket: this.awsConfig.getS3Bucket(bucket),
      Key: path,
      Body: body,
      ContentType: contentType,
      ACL: 'private',
    });

    try {
      await this.client.send(command);

      return true;
    } catch (e) {
      this.logger.error(
        S3UploadFailError.name,
        JSON.stringify({ name: e?.name, message: e?.message, cause: e?.cause }, null, 2),
      );

      return false;
    }
  }
}
