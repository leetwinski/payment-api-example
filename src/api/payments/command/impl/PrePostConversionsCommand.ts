import ICommand from "../ICommand";

export default class PrePostConversionsCommand<TResult, TCtx, TInnerResult, TInnerCtx>
  implements ICommand<TResult, TCtx> {

    constructor(
      public ctx: TCtx,
      private cmd: ICommand<TInnerResult, TInnerCtx>,
      private preConverter: (ctx: TCtx) => TInnerCtx,
      private postConverter: (result: TInnerResult) => TResult
    ) {}

    exec(): PromiseLike<TResult> {
      return this.cmd
        .clone()
        .withCtx(this.preConverter(this.ctx))
        .exec()
        .then(this.postConverter)
    }

    clone(): this {
      return new PrePostConversionsCommand(
        this.ctx, this.cmd.clone(), this.preConverter, this.postConverter) as this;
    }

    withCtx(ctx: TCtx): this {
      this.ctx = ctx;
      return this;
    }
  }
