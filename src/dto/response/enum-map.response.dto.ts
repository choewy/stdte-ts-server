import { ApiResponseProperty } from '@nestjs/swagger';

export class EnumMapResponseDto {
  @ApiResponseProperty({ type: Number })
  value: number;

  @ApiResponseProperty({ type: String })
  text: string;

  constructor(value: number, texts: Record<number, string>) {
    this.value = value;
    this.text = texts[value];
  }
}
