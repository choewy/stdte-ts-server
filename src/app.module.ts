import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';

import { MySqlConfig, entireEntity } from '@server/common';
import { CookieModule, SignModule } from '@server/core';
import { AuthModule, ProfileModule } from '@server/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySqlConfig().getTypeOrmModuleOptions(entireEntity)),
    CookieModule,
    SignModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
