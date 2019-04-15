import * as request from 'request-promise'
import { ApiResult } from '../../apitype'
import AppError from '../../error/ApiError'
import Result from '../../util/Result'
import ICommand from '../ICommand'
import IApiRequestContext from './IApiRequestContext'

export default class ApiRequestCommand<TRequest, THeaders, TResponse>
  implements ICommand<ApiResult<TResponse>, IApiRequestContext<TRequest, THeaders>> {

    constructor (
      private method: 'GET' | 'POST' | 'PUT',
      private baseUrl: string,
      private makeUri: (req: TRequest) => string) {}

    public clone (): this {
      return new ApiRequestCommand(this.method, this.baseUrl, this.makeUri) as this
    }

    public exec (ctx: IApiRequestContext<TRequest, THeaders>): PromiseLike<ApiResult<TResponse>> {
      const opts = {
        baseUrl: this.baseUrl,
        body: ctx.body,
        headers: ctx.headers,
        json: true,
        method: this.method,
        resolveWithFullResponse: true,
        simple: false,
        uri: this.makeUri(ctx.body)
      }

      return request(opts).then((response) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          return Result.ok<TResponse, AppError>(response.body)
        }

        return Result.err<TResponse, AppError>(AppError.fromJson(response.body))

      }).catch(
        (ex: Error) =>
          Result.err<TResponse, AppError>(new AppError('ERR_REQUEST', ex.message))
      )
        }
  }
