export class AppConfig {
  private readonly NAME = process.env.NAME;
  private readonly LABEL = process.env.LABEL;
  private readonly VERSION = process.env.VERSION;

  getName() {
    return this.NAME as string;
  }

  getLoggerName() {
    return [this.NAME, this.LABEL].join('-');
  }

  getVersion() {
    return this.VERSION ?? '';
  }
}
