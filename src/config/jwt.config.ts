import { ConfigService } from '@nestjs/config';

export class JwtConfig {
  private readonly configService = new ConfigService();

  private readonly SECRET = this.configService.get<string>('JWT_SECRET');

  getSecret(): string {
    return this.SECRET ?? '';
  }
}
