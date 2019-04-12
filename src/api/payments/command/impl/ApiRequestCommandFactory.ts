import AuthenticationHolder from "../../service/impl/AuthenticationHolder";
import ApiRequestCommand from "./ApiRequestCommand";
import IApiRequestContext from "./IApiRequestContext";

interface Headers {
  readonly Bearer: string;
};

export default class ApiRequestCommandFactory {
  constructor(private baseUrl: string, private auth: AuthenticationHolder) {}

  // private makeCtx<TRequest>(req: TRequest, uri: string, bearer: string): IApiRequestContext<TRequest, Headers> {
  //   return {
  //     url: this.baseUrl + '/' + uri,
  //     body: req,
  //     headers: { Bearer: bearer }
  //   }
  // }

  // private checkAuth(): boolean {
  //   return !this.auth.isOutdated;
  // }
  
  // create<TRequest, TResult>(
  //   uri: string,
  //   method: 'GET' | 'POST' | 'PUT',
  // ): ApiRequestCommand<TRequest, Headers, TResult> {
  //   // TODO: complete
  // } 
}
