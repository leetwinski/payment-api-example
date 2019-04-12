import AuthenticationHolder from "../../service/impl/AuthenticationHolder";
import ApiRequestCommand from "./ApiRequestCommand";
import IApiRequestContext from "./IApiRequestContext";
import ICommand from "../ICommand";
import PreExecFilterCommand from "./PreExecFilterCommand";
import PrePostConversionsCommand from "./PrePostConversionsCommand";

interface Headers {
  readonly Bearer: string;
};

export default class ApiRequestCommandFactory {
  constructor(private baseUrl: string, private auth: AuthenticationHolder) {}

  // private makeCtx<TRequest>(req: TRequest, bearer: string): IApiRequestContext<TRequest, Headers> {
  //   return {
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
  // ): ICommand<TResult, TRequest> {
  //   return new PreExecFilterCommand(
  //     null,
  //     new PrePostConversionsCommand()
  // } 
}
