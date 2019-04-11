export default interface IApiRequestContext<TRequest, THeaders, TResponse, TResult> {
  url: string;
  headers: THeaders;
  body: TRequest;
  converter: (val: TResponse) => TResult;
}
