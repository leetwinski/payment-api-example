import { AuthRequest, Auth, ApiResult } from "../apitype/index";

export interface IAuthService {
  discardAuth(): void;
  authenticate(req: AuthRequest): PromiseLike<ApiResult<Auth>>;
  authExpired(precheckMillis: number): boolean;
}
