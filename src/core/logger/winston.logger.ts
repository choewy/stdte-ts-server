import 'dotenv/config';
import 'winston-daily-rotate-file';

import winstonDailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';

import { LogLevel } from '@nestjs/common';

export class WinstonLogger {
  private readonly LEVEL = Symbol.for('level');
  private readonly NAME = process.env.LOGGER_NAME;

  private getFormatByLevel(level: LogLevel) {
    const format = winston.format((info) => {
      if (info[this.LEVEL] === level) {
        return info;
      } else {
        return false;
      }
    });

    return format();
  }

  private getDefaultFormats() {
    return [
      winston.format.timestamp(),
      utilities.format.nestLike(this.NAME, {
        prettyPrint: true,
        colors: true,
      }),
    ];
  }

  private getDailyTransportOptions(level: LogLevel): winstonDailyRotateFile.DailyRotateFileTransportOptions {
    const dirname = './logs';
    const filename = [this.NAME, '%DATE%', level].join('.');
    const datePattern = 'YYYY-MM-DD';
    const maxSize = '250m';
    const maxFiles = '7d';

    return {
      level,
      dirname,
      filename,
      datePattern,
      maxSize,
      maxFiles,
      format: winston.format.combine(this.getFormatByLevel(level), ...this.getDefaultFormats()),
    };
  }

  private getWinstonModuleOptions(): WinstonModuleOptions {
    const transports: winston.transport[] = [
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(...this.getDefaultFormats()),
      }),
    ];

    transports.push(
      new winston.transports.DailyRotateFile(this.getDailyTransportOptions('verbose')),
      new winston.transports.DailyRotateFile(this.getDailyTransportOptions('warn')),
      new winston.transports.DailyRotateFile(this.getDailyTransportOptions('error')),
    );

    return { transports };
  }

  create() {
    return WinstonModule.createLogger(this.getWinstonModuleOptions());
  }
}
