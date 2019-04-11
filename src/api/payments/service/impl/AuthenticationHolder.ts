import { AuthResponse } from "../../apitype/index";

export default class AuthenicationHolder {
  private expiration: number;
  
  constructor(readonly auth: AuthResponse, private thresholdMillis: number = 1000) {
    this.expiration = Date.parse(auth.expiresIn);
  };

  isOutdated(): boolean {
    return (Date.now() + this.thresholdMillis) >= this.expiration
  }
}
