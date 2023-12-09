export class AppConfig {
  private readonly NAME = process.env.NAME;
  private readonly LABEL = process.env.LABEL;
  private readonly VERSION = process.env.VERSION;

  getLoggerName() {
    return [this.NAME, this.LABEL].join('-');
  }

  getLogFilePrefix() {
    return this.NAME as string;
  }

  getVersion() {
    return this.VERSION ?? '';
  }
}
