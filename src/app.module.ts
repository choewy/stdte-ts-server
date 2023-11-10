import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';

import { MySqlConfig, TypeOrmReaderModule, TypeOrmWriterModule, entireEntity } from '@server/common';
import { SignGuardModule, RoleGuardModule, LoggerModule } from '@server/core';
import { AuthModule, ProfileModule, RoleModule, TeamModule } from '@server/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmWriterModule.forRoot(new MySqlConfig().getTypeOrmModuleWriterOptions(entireEntity)),
    TypeOrmReaderModule.forRoot(new MySqlConfig().getTypeOrmModuleReaderOptions(entireEntity)),
    LoggerModule,
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
