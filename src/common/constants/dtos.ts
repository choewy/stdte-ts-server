import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class MapResponseDto<T, R> {
  public readonly value: T;
  public readonly transform: R;

  constructor(value: T, transform: (value: T) => R) {
    this.value = value;
    this.transform = transform(value);
  }
}

export class ListQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @IsInt()
  @Max(100)
  take: number;
}

export class ListResponseDto<D, Q> {
  constructor(public readonly total: number, public readonly rows: D[], public readonly query: Q) {}
}
