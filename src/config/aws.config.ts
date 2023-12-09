import { ConfigService } from '@nestjs/config';

import { S3Bucket } from '@server/common';

export class AwsConfig {
  private readonly configService = new ConfigService();

  private readonly ACCESS_KEY_ID = this.configService.get<string>('AWS_ACCESS_KEY_ID');
  private readonly SECRET_ACCESS_KEY = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

  private readonly S3_REGION = this.configService.get<string>('AWS_S3_REGION');
  private readonly S3_BUCKET: S3Bucket = {
    log: this.configService.get<string>('AWS_S3_LOG_BUCKET') as string,
  };

  getCredentials() {
    return {
      accessKeyId: this.ACCESS_KEY_ID as string,
      secretAccessKey: this.SECRET_ACCESS_KEY as string,
    };
  }

  getS3Region() {
    return this.S3_REGION as string;
  }

  getS3Bucket(bucket: keyof S3Bucket): string {
    return this.S3_BUCKET[bucket];
  }
}
