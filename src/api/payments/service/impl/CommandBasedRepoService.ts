import IRemoteEntityRepoService from "../IRemoteEntityRepoService";
import ICommand from "../../command/ICommand";
import { ApiResult } from "../../apitype";

export default class CommandBasedRepoService<TEntity, TCreationData, TID = string>
  implements IRemoteEntityRepoService<TEntity, TCreationData, TID> {
    constructor(
      private createCommand: ICommand<ApiResult<TEntity>, TCreationData>,
      private getCommand: ICommand<ApiResult<TEntity>, TID>,
      private deleteCommand: ICommand<ApiResult<void>, TID>,
      private listCommand: ICommand<ApiResult<TEntity[]>, undefined>
    ) {}

    list(): PromiseLike<ApiResult<TEntity[]>> {
      return this.listCommand.clone().exec(undefined);
    }

    create(data: TCreationData): PromiseLike<ApiResult<TEntity>> {
      return this.createCommand.clone().exec(data);
    }

    delete(id: TID): PromiseLike<ApiResult<void>> {
      return this.deleteCommand.clone().exec(id);
    }

    get(id: TID): PromiseLike<ApiResult<TEntity>> {
      return this.getCommand.clone().exec(id);
    }
  }
