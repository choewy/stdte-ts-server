import { DataSource } from 'typeorm';

import { BeforeApplicationShutdown, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';

import { MySQLConfig } from './config';
import { HttpExceptionFilter, LogInterceptor, RequestMiddleware, TransformInterceptor, SlackModule } from './core';
import {
  BatchModule,
  CategoryModule,
  CredentialsModule,
  CustomerModule,
  ProjectModule,
  RoleModule,
  SettingModule,
  UserModule,
  TimeModule,
  SelectModule,
  AnalysisModule,
} from './module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    HttpModule,
    SettingModule,
    CredentialsModule,
    BatchModule,
    RoleModule,
    CategoryModule,
    CustomerModule,
    ProjectModule,
    UserModule,
    TimeModule,
    SelectModule,
    AnalysisModule,
    SlackModule,
  ],
  controllers: [AppController],
  providers: [RequestMiddleware, HttpExceptionFilter, LogInterceptor, TransformInterceptor],
})
export class AppModule implements NestModule, BeforeApplicationShutdown {
  constructor(private readonly dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).exclude('/health').forRoutes('*');
  }

  async beforeApplicationShutdown() {
    await this.dataSource.destroy();
  }
}
