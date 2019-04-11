import IRemoteEntityRepoService from "../IRemoteEntityRepoService";
import ICommand from "../../command/ICommand";
import { ApiResult } from "../../apitype/index";

type Ctx<T> = { data: T };

export default abstract class CommandBasedRepoService<TEntity, TCreationData, TID>
  implements IRemoteEntityRepoService<TEntity, TCreationData, TID> {
    constructor(
      private createCommand: ICommand<ApiResult<TEntity>, Ctx<TCreationData>>,
      private getCommand: ICommand<ApiResult<TEntity>, Ctx<TID>>,
      private deleteCommand: ICommand<ApiResult<void>, Ctx<TID>>,
      private listCommand: ICommand<ApiResult<TEntity[]>, Ctx<undefined>>,      
    ) {}

    abstract createContext<T, R extends Ctx<T>>(data: T): R;
    
    list(): PromiseLike<ApiResult<TEntity[]>> {
      return this.listCommand.clone().withCtx(this.createContext(undefined)).exec();
    }

    create(data: TCreationData): PromiseLike<ApiResult<TEntity>> {
      return this.createCommand.clone().withCtx(this.createContext(data)).exec();
    }

    delete(id: TID): PromiseLike<ApiResult<void>> {
      return this.deleteCommand.clone().withCtx(this.createContext(id)).exec();
    }

    get(id: TID): PromiseLike<ApiResult<TEntity>> {
      return this.getCommand.clone().withCtx(this.createContext(id)).exec();
    }
  }
