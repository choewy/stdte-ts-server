import { DataSource } from 'typeorm';

import { BeforeApplicationShutdown, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { MySQLConfig } from './config';
import { HttpExceptionFilter, LogInterceptor, RequestMiddleware, TransformInterceptor } from './core';
import { BatchModule, CredentialsModule, InitializeModule, RoleModule } from './module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    InitializeModule,
    CredentialsModule,
    BatchModule,
    RoleModule,
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
