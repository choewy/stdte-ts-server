import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectTypeBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
