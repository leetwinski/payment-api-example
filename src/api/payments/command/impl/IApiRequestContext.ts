export default interface IApiRequestContext<TRequest, THeaders, TResponse> {
  url: string;
  headers: THeaders;
  body: TRequest;
}
