import { DataSource } from 'typeorm';

import { BeforeApplicationShutdown, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { MySQLConfig } from './config';
import { HttpExceptionFilter, LogInterceptor, RequestMiddleware, TransformInterceptor } from './core';
import {
  BatchModule,
  CategoryModule,
  CredentialsModule,
  CustomerModule,
  InitializeModule,
  ProjectModule,
  RoleModule,
  SettingModule,
  UserModule,
} from './module';
import { TimeModule } from './module/time';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    InitializeModule,
    SettingModule,
    CredentialsModule,
    BatchModule,
    RoleModule,
    CategoryModule,
    CustomerModule,
    ProjectModule,
    UserModule,
    TimeModule,
  ],
  controllers: [AppController],
  providers: [RequestMiddleware, HttpExceptionFilter, LogInterceptor, TransformInterceptor],
})
export class AppModule implements BeforeApplicationShutdown, NestModule {
  constructor(private readonly dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('/');
  }

  async beforeApplicationShutdown() {
    await this.dataSource.destroy();
  }
}
