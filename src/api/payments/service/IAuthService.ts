import { AuthRequest, ApiResult, AuthResponse } from "../apitype";

export interface IAuthService {
  authenticate(req: AuthRequest): PromiseLike<ApiResult<AuthResponse>>;
}
