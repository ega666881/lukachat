export class AuthCredentials {
  constructor(
    public readonly userId: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
