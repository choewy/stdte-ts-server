import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AppService } from '@server/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [AppService],
    }).compile();

    service = module.get(AppService);
  });

  it('version', () => {
    expect(typeof service.getVersion().data?.version).toEqual('string');
  });
});
