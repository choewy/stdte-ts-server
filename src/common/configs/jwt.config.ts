import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  private readonly configService = new ConfigService();

  private readonly JWT_SECRET = this.configService.get<string>('JWT_SECRET');

  public getSecret(): string {
    return this.JWT_SECRET;
  }

  public getJwtModuleOptions(): JwtModuleOptions {
    return { secret: this.JWT_SECRET };
  }
}
