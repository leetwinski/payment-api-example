import IRemoteEntityRepoService from "../IRemoteEntityRepoService";
import ICommand from "../../command/ICommand";
import { ApiResult } from "../../apitype";

export default abstract class CommandBasedRepoService<TEntity, TCreationData, TID = string>
  implements IRemoteEntityRepoService<TEntity, TCreationData, TID> {
    constructor(
      private createCommand: ICommand<ApiResult<TEntity>, TCreationData>,
      private getCommand: ICommand<ApiResult<TEntity>, TID>,
      private deleteCommand: ICommand<ApiResult<void>, TID>,
      private listCommand: ICommand<ApiResult<TEntity[]>, undefined>
    ) {}

    list(): PromiseLike<ApiResult<TEntity[]>> {
      return this.listCommand.clone().withCtx(undefined).exec();
    }

    create(data: TCreationData): PromiseLike<ApiResult<TEntity>> {
      return this.createCommand.clone().withCtx(data).exec();
    }

    delete(id: TID): PromiseLike<ApiResult<void>> {
      return this.deleteCommand.clone().withCtx(id).exec();
    }

    get(id: TID): PromiseLike<ApiResult<TEntity>> {
      return this.getCommand.clone().withCtx(id).exec();
    }
  }
