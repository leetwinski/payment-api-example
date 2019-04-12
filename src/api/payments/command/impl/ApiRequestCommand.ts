import ICommand from "../ICommand";
import Result from "../../util/Result";
import { ApiResult } from "../../apitype";
import request from 'request-promise';
import AppError from "../../error/ApiError";
import IApiRequestContext from "./IApiRequestContext";

export default class ApiRequestCommand<TRequest, THeaders, TResponse>
  implements ICommand<ApiResult<TResponse>, IApiRequestContext<TRequest, THeaders>> {

    constructor(
      private method: 'GET' | 'POST' | 'PUT',
      private baseUrl: string,
      private uri: string) {}

    exec(ctx: IApiRequestContext<TRequest, THeaders>): PromiseLike<ApiResult<TResponse>> {
      const opts = {
        baseUrl: this.baseUrl,
        uri: this.uri,
        method: this.method,
        json: true,
        headers: ctx.headers,
        body: ctx.body,
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

    clone(): this {
      return new ApiRequestCommand(this.method, this.baseUrl, this.uri) as this;
    }
  }
