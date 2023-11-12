import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';

import { MySqlConfig, TypeOrmReaderModule, TypeOrmWriterModule, entireEntity } from '@server/common';
import { AuthGuardModule, RoleGuardModule, HttpRequestModule, HttpRequestMiddleware } from '@server/core';
import { AuthModule, ProfileModule, RoleModule, TeamModule } from '@server/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmWriterModule.forRoot(new MySqlConfig().getTypeOrmModuleWriterOptions(entireEntity)),
    TypeOrmReaderModule.forRoot(new MySqlConfig().getTypeOrmModuleReaderOptions(entireEntity)),
    HttpRequestModule,
    AuthGuardModule,
    RoleGuardModule,
    AuthModule,
    ProfileModule,
    RoleModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestMiddleware).exclude('/', '/api-docs(.*)').forRoutes('(.*)');
  }
}
