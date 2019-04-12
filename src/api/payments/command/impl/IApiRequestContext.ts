export default interface IApiRequestContext<TRequest, THeaders> {
  headers: THeaders;
  body: TRequest;
}
