import { ApiResponseProperty } from '@nestjs/swagger';

import { HttpRequest } from '@server/common';
import { AuthRoleResponseDto } from './auth-role.response.dto';

export class AuthResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: AuthRoleResponseDto })
  role: AuthRoleResponseDto = null;

  constructor(request: HttpRequest) {
    this.id = request.userId;
    this.email = request.userEmail;
    this.name = request.userName;

    if (request.userRole) {
      this.role = new AuthRoleResponseDto(request.userRole);
    }
  }
}
