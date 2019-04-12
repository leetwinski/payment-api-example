import ICommand from "../ICommand";

export default class PrePostConversionsCommand<TResult, TCtx, TInnerResult, TInnerCtx>
  implements ICommand<TResult, TCtx> {

    constructor(
      private preConverter: (ctx: TCtx) => TInnerCtx,
      private cmd: ICommand<TInnerResult, TInnerCtx>,      
      private postConverter: (result: TInnerResult) => TResult
    ) {}

    exec(ctx: TCtx): PromiseLike<TResult> {
      return this.cmd
        .clone()
        .exec(this.preConverter(ctx))
        .then(this.postConverter)
    }

    clone(): this {
      return new PrePostConversionsCommand(
        this.preConverter, this.cmd.clone(), this.postConverter) as this;
    }
  }
