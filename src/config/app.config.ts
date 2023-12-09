export class AppConfig {
  private readonly NAME = process.env.NAME;
  private readonly CONTAINER_PREFIX = process.env.CONTAINER_PREFIX;
  private readonly CONTAINER_PROCESS = process.env.CONTAINER_PROCESS;
  private readonly VERSION = process.env.VERSION;

  getAppName() {
    return this.NAME as string;
  }

  getVersion() {
    return this.VERSION ?? '';
  }

  getContainerPrefix() {
    return this.CONTAINER_PREFIX;
  }

  getContainerName() {
    return [this.CONTAINER_PREFIX, this.CONTAINER_PROCESS].join('-');
  }
}
