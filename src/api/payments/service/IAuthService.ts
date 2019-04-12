import { ApiResult, AuthRequest, AuthResponse } from '../apitype'

export interface IAuthService {
  authenticate (req: AuthRequest): PromiseLike<ApiResult<AuthResponse>>
}
