import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';

import { MySqlConfig, entireEntity } from '@server/common';
import { SignGuardModule, RoleGuardModule } from '@server/core';
import { AuthModule, ProfileModule, RoleModule, TeamModule } from '@server/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new MySqlConfig().getTypeOrmModuleWriterOptions(entireEntity)),
    TypeOrmModule.forRoot(new MySqlConfig().getTypeOrmModuleReaderOptions(entireEntity)),
    SignGuardModule,
    RoleGuardModule,
    AuthModule,
    ProfileModule,
    RoleModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
