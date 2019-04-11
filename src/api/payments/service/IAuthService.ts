import { AuthRequest, ApiResult, AuthResponse } from "../apitype/index";

export interface IAuthService {
  discardAuth(): void;
  authenticate(req: AuthRequest): PromiseLike<ApiResult<AuthResponse>>;
  authExpired(precheckMillis: number): boolean;
}
