import IRemoteEntityRepoService from "../IRemoteEntityRepoService";
import ICommand from "../../command/ICommand";
import { ApiResult } from "../../apitype/index";

export default class CommandBasedRepoService<TEntity, TCreationData, TID>
  implements IRemoteEntityRepoService<TEntity, TCreationData, TID> {
    constructor (
      private createCommand: ICommand<ApiResult<TEntity>, TCreationData>,
      private getCommand: ICommand<ApiResult<TEntity>, TID>,
      private listCommand: ICommand<ApiResult<TEntity[]>>,
      private deleteCommand: ICommand<ApiResult<void>, TID>
    ) {}

    list(): PromiseLike<ApiResult<TEntity[]>> {
      return this.listCommand.clone().exec();
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
