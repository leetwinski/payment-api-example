export default interface IApiRequestContext<TRequest, THeaders> {
  url: string;
  headers: THeaders;
  body: TRequest;
}
