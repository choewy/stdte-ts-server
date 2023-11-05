export class AuthResponseDto {
  constructor(public readonly ok: boolean, public readonly failReason?: string | object) {}
}
