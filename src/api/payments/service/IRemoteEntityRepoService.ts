import { ApiResult } from "../apitype";

export default interface IRemoteEntityRepoService<TEntity, TCreationData, TID> {
  list(): PromiseLike<ApiResult<TEntity[]>>;
  create(data: TCreationData): PromiseLike<ApiResult<TEntity>>;
  delete(id: TID): PromiseLike<ApiResult<void>>;
  get(id: TID): PromiseLike<ApiResult<TEntity>>;
}
