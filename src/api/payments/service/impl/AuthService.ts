import { ApiResult, AuthRequest, AuthResponse } from '../../apitype'
import ICommand from '../../command/ICommand'
import { IAuthService } from '../IAuthService'

export default class AuthService implements IAuthService {
  private currentAuthPromise: PromiseLike<ApiResult<AuthResponse>> | null = null

  constructor (private cmd: ICommand<ApiResult<AuthResponse>, AuthRequest>) {}

  public authenticate (req: AuthRequest): PromiseLike<ApiResult<AuthResponse>> {    
    if (this.currentAuthPromise !== null) {
      return this.currentAuthPromise
    }

    const clearState = () => { this.currentAuthPromise = null };

    this.currentAuthPromise = this.cmd.clone().exec(req).then((res) => {
      clearState()
      return res
    })

    return this.currentAuthPromise;
  }
}
