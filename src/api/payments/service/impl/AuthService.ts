import { IAuthService } from "../IAuthService";
import ICommand from "../../command/ICommand";
import { AuthResponse, AuthRequest, ApiResult } from "../../apitype";

export default class AuthService implements IAuthService {
  private currentAuthPromise: PromiseLike<ApiResult<AuthResponse>> | null;
  
  constructor(private cmd: ICommand<ApiResult<AuthResponse>, AuthRequest>) {}

  authenticate(req: AuthRequest): PromiseLike<ApiResult<AuthResponse>> {
    if (this.currentAuthPromise !== null) {
      return this.currentAuthPromise;
    }

    this.currentAuthPromise = this.cmd.clone().withCtx(req).exec();

    return this.currentAuthPromise;
  }
}
