import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MySQLConfig } from './config';
import { CredentialsModule } from './module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySQLConfig().getTypeOrmModuleOptions()),
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
