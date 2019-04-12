import ICommand from "../ICommand";

export default class PrePostConversionsCommand<TResult, TCtx, TInnerResult, TInnerCtx>
  implements ICommand<TResult, TCtx> {

    constructor(
      private cmd: ICommand<TInnerResult, TInnerCtx>,
      private preConverter: (ctx: TCtx) => TInnerCtx,
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
        this.cmd.clone(), this.preConverter, this.postConverter) as this;
    }
  }
