export class SelectDto {
  value: string | number;
  label: string;

  constructor(value: number | string, label: string) {
    this.value = value;
    this.label = label;
  }
}
