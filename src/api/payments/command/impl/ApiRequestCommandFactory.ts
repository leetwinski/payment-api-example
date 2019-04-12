import { ApiResult } from '../../apitype'
import ApiError from '../../error/ApiError'
import AuthenticationHolder from '../../service/impl/AuthenticationHolder'
import { identity } from '../../util/func'
import Result from '../../util/Result'
import ICommand from '../ICommand'
import ApiRequestCommand from './ApiRequestCommand'
import IApiRequestContext from './IApiRequestContext'
import PreExecFilterCommand from './PreExecFilterCommand'
import PrePostConversionsCommand from './PrePostConversionsCommand'

// tslint:disable-next-line:interface-name
interface Headers {
  readonly Bearer: string
}

export default class ApiRequestCommandFactory {
  constructor (private baseUrl: string, private auth: AuthenticationHolder) {}

  public create<TRequest, TResult> (
    makeUri: (ctx: TRequest) => string,
    method: 'GET' | 'POST' | 'PUT'
  ): ICommand<ApiResult<TResult>, TRequest> {
    return new PreExecFilterCommand(
      (_: TRequest) => this.checkAuth(),
      Result.err<TResult, ApiError>(new ApiError('ERR_AUTH_TOKEN_EXPIRED', 'Auth token expired')),
      new PrePostConversionsCommand(
        (ctx: TRequest) => this.makeCtx(ctx),
        new ApiRequestCommand<TRequest, Headers, TResult>(method, this.baseUrl, makeUri),
        identity
      )
    )
  }

  private makeCtx<TRequest> (req: TRequest): IApiRequestContext<TRequest, Headers> {
    return {
      body: req,
      headers: { Bearer: this.auth.auth.authToken }
    }
  }

  private checkAuth (): boolean {
    return !this.auth.isOutdated
  }
}
