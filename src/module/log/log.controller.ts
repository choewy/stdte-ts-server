import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RequestUser, RolePolicyScope, User } from '@server/common';
import { UseRoleGuard, AuthGuard } from '@server/core';

import { GetLogListBodyDto, HttpRequestLogListResponseDto } from './dto';
import { LogService } from './log.service';

@UseRoleGuard(
  {
    accessRole: RolePolicyScope.Developer,
    accessTeam: RolePolicyScope.Developer,
    accessUser: RolePolicyScope.Developer,
    accessProject: RolePolicyScope.Developer,
  },
  AuthGuard,
)
@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOperation({ summary: 'get log list' })
  @ApiOkResponse({ type: HttpRequestLogListResponseDto })
  async getHttpRequestLogList(
    @RequestUser() user: User,
    @Body() body: GetLogListBodyDto,
  ): Promise<HttpRequestLogListResponseDto> {
    return this.logService.getHttpRequestLogList(user, body);
  }
}
