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
    return [new AppConfig().getAppName(), new SystemConfig().getNodeEnv(), filename].join('/');
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
    } catch (e) {
      const context = [S3Service.name, this.upload.name].join('.');
      const error = new S3UploadFailError(e);

      this.logger.error(error.name, error.details, context);
    }
  }
}
