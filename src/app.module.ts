import { DataSource } from 'typeorm';

import { BeforeApplicationShutdown, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MySQLConfig } from './config';
import { HttpExceptionFilter } from './core';
import { InitModule, CredentialsModule } from './module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    InitModule,
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpExceptionFilter],
})
export class AppModule implements BeforeApplicationShutdown {
  constructor(private readonly dataSource: DataSource) {}

  async beforeApplicationShutdown() {
    await this.dataSource.destroy();
  }
}
