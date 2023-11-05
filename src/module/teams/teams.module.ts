import { Module } from '@nestjs/common';

import { TeamController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  controllers: [TeamController],
  providers: [TeamsService],
})
export class TeamsModule {}
