import { ApiResult, AuthRequest, AuthResponse } from '../../apitype'
import ICommand from '../../command/ICommand'
import { IAuthService } from '../IAuthService'

export default class AuthService implements IAuthService {
  private currentAuthPromise: PromiseLike<ApiResult<AuthResponse>> | null

  constructor (private cmd: ICommand<ApiResult<AuthResponse>, AuthRequest>) {}

  public authenticate (req: AuthRequest): PromiseLike<ApiResult<AuthResponse>> {
    if (this.currentAuthPromise !== null) {
      return this.currentAuthPromise
    }

    this.currentAuthPromise = this.cmd.clone().exec(req)

    return this.currentAuthPromise
  }
}
