import ICommand from "../ICommand";

export default class PreExecFilterCommand<TResult, TCtx> implements ICommand<TResult, TCtx> {
  constructor(
    public ctx: TCtx,
    private innerCmd: ICommand<TResult, TCtx>,
    private filter: (ctx: TCtx) => boolean,
    private defaultResult: TResult
  ) {}

  clone(): this {
    return new PreExecFilterCommand(
      this.ctx, this.innerCmd.clone(), this.filter, this.defaultResult
    ) as this;
  }

  exec(): PromiseLike<TResult>  {
    if (this.filter(this.ctx) === true) {
      return this.innerCmd.exec();
    }

    return Promise.resolve(this.defaultResult)
  }

  withCtx(ctx: TCtx): this {
    this.ctx = ctx;
    return this;
  }
}
