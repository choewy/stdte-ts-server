import { ApiResponseProperty } from '@nestjs/swagger';

import { AuthStatusMapResponseDto, EmploymentStatusMapResponseDto, HttpRequest } from '@server/common';
import { AuthRoleResponseDto } from './auth-role.response.dto';

export class AuthResponseDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: AuthStatusMapResponseDto })
  authStatus: AuthStatusMapResponseDto;

  @ApiResponseProperty({ type: EmploymentStatusMapResponseDto })
  employmentStatus: EmploymentStatusMapResponseDto;

  @ApiResponseProperty({ type: AuthRoleResponseDto })
  role: AuthRoleResponseDto = null;

  constructor(request: HttpRequest) {
    this.id = request.userId;
    this.email = request.userEmail;
    this.name = request.userName;
    this.authStatus = new AuthStatusMapResponseDto(request.userAuthStatus);
    this.employmentStatus = new EmploymentStatusMapResponseDto(request.userEmploymentStatus);

    if (request.userRole) {
      this.role = new AuthRoleResponseDto(request.userRole);
    }
  }
}
