import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MySQLConfig } from './config';
import { HttpExceptionFilter } from './core';
import {
  InitModule,
  CredentialsModule,
  ProfileModule,
  RoleModule,
  TeamModule,
  UserModule,
  ProjectModule,
  ProjectTypeModule,
  ProjectOptionModule,
  TimeRecordModule,
  TimeRecordMemoModule,
  TimeRecordLogModule,
  SearchModule,
} from './module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    InitModule,
    CredentialsModule,
    ProfileModule,
    RoleModule,
    TeamModule,
    UserModule,
    ProjectModule,
    ProjectTypeModule,
    ProjectOptionModule,
    TimeRecordModule,
    TimeRecordMemoModule,
    TimeRecordLogModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpExceptionFilter],
})
export class AppModule {}
