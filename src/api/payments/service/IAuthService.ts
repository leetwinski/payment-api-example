import { AuthRequest, ApiResult, AuthResponse } from "../apitype";

export interface IAuthService {
  discardAuth(): void;
  authenticate(req: AuthRequest): PromiseLike<ApiResult<AuthResponse>>;
}
