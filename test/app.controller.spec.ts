import request from 'supertest';

import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AppService } from '@server/app.service';
import { AppController } from '@server/app.controller';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });

  afterAll(() => {
    app.close();
  });
});
