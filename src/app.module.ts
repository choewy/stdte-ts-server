import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MySQLConfig } from './config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
