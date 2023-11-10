import { ConfigService } from '@nestjs/config';

export class ServerConfig {
  private readonly configService = new ConfigService();

  private readonly PORT = this.configService.get<string>('PORT');
  private readonly HOST = this.configService.get<string>('HOST');

  public getListenOptions(): [number, string, () => void] {
    return [Number(this.PORT), this.HOST, () => (process.send === undefined ? null : process.send('ready'))];
  }
}
