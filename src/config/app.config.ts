export class AppConfig {
  private readonly NAME = process.env.APP_NAME;
  private readonly CONTAINER = process.env.CONTAINER_NAME;
  private readonly VERSION = process.env.VERSION;

  getName() {
    return this.NAME as string;
  }

  getLoggerName() {
    return [this.NAME, this.CONTAINER].join('-');
  }

  getVersion() {
    return this.VERSION ?? '';
  }
}
