import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectOptionBodyDto {
  @IsNotEmpty()
  @IsInt()
  projectTypeId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
