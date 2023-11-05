export class MapDto<T, R> {
  public readonly value: T;
  public readonly transform: R;

  constructor(value: T, transform: (value: T) => R) {
    this.value = value;
    this.transform = transform(value);
  }
}
