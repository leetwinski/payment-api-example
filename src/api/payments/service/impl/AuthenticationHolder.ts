import { AuthResponse } from '../../apitype'

export default class AuthenticationHolder {
  private expiration: number

  constructor (public auth: AuthResponse | null = null, private thresholdMillis: number = 1000) {
    this.expiration = auth ? Date.parse(auth.expiresIn) : -1
  }

  public isOutdated (): boolean {
    return (Date.now() + this.thresholdMillis) >= this.expiration
  }

  public reset (): void {
    this.expiration = -1
    this.auth = null
  }
}
