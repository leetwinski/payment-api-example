import { AuthResponse } from '../../apitype'

export default class AuthenticationHolder {
  public auth: AuthResponse | null
  private expiration: number

  constructor (auth: AuthResponse | null = null, private thresholdMillis: number = 1000) {
    this.updateAuth(auth)
  }

  public updateAuth(auth: AuthResponse): void {
    this.expiration = auth ? Date.parse(auth.expiresIn) : -1
    this.auth = auth
  }

  public isOutdated (): boolean {
    return (Date.now() + this.thresholdMillis) >= this.expiration
  }

  public reset (): void {
    this.updateAuth(null)
  }
}
