import AuthenticationHolder from "../../service/impl/AuthenticationHolder";
import ApiRequestCommand from "./ApiRequestCommand";
import IApiRequestContext from "./IApiRequestContext";
import ICommand from "../ICommand";
import PreExecFilterCommand from "./PreExecFilterCommand";
import PrePostConversionsCommand from "./PrePostConversionsCommand";
import Result from "../../util/Result";
import ApiError from "../../error/ApiError";
import { identity } from "../../util/func";
import { ApiResult } from "../../apitype";

interface Headers {
  readonly Bearer: string;
};

export default class ApiRequestCommandFactory {
  constructor(private baseUrl: string, private auth: AuthenticationHolder) {}

  private makeCtx<TRequest>(req: TRequest): IApiRequestContext<TRequest, Headers> {
    return {
      body: req,
      headers: { Bearer: this.auth.auth.authToken }
    }
  }

  private checkAuth(): boolean {
    return !this.auth.isOutdated;
  }
  
  create<TRequest, TResult>(
    uri: string,
    method: 'GET' | 'POST' | 'PUT',
  ): ICommand<ApiResult<TResult>, TRequest> {
    return new PreExecFilterCommand(
      (_: TRequest) => this.checkAuth(),
      Result.err<TResult, ApiError>(new ApiError("ERR_AUTH_TOKEN_EXPIRED", "Auth token expired")),
      new PrePostConversionsCommand(
        (ctx: TRequest) => this.makeCtx(ctx),
        new ApiRequestCommand<TRequest, Headers, TResult>(method, this.baseUrl, uri),
        identity
      )
    );
  } 
}
