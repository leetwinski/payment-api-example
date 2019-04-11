import ICommand from "../ICommand";
import Result from "../../util/Result";
import { ApiResult } from "../../apitype/index";
import request from 'request-promise';
import AppError from "../../error/ApiError";
import IApiRequestContext from "./IApiRequestContext";

export default class ApiRequestCommand<TRequest, THeaders, TResponse>
  implements ICommand<ApiResult<TResponse>, IApiRequestContext<TRequest, THeaders, TResponse>> {

    constructor(
      private method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      public ctx: IApiRequestContext<TRequest, THeaders, TResponse>) {}

    exec(): PromiseLike<ApiResult<TResponse>> {
      const opts = {
        uri: this.ctx.url,
        method: this.method,
        json: true,
        headers: this.ctx.headers,
        body: this.ctx.body,
        simple: false,
        resolveWithFullResponse: true
      };
      
      return request(opts).then((response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          return Result.ok<TResponse, AppError>(response.body);
        }

        return Result.err<TResponse, AppError>(AppError.fromJson(response.body));
        
      }).catch((ex: Error) => Result.err<TResponse, AppError>(new AppError('ERR_REQUEST', ex.message)))
    }

    clone<T extends ApiRequestCommand<TRequest, THeaders, TResponse>>(): T {
      return new ApiRequestCommand(this.method, this.ctx) as T;
    }

    withCtx(ctx: IApiRequestContext<TRequest, THeaders, TResponse>): this {
      this.ctx = ctx;
      return this;
    }
  }
