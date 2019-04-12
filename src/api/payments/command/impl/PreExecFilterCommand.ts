import ICommand from "../ICommand";

export default class PreExecFilterCommand<TResult, TCtx> implements ICommand<TResult, TCtx> {
  constructor(
    private innerCmd: ICommand<TResult, TCtx>,
    private filter: (ctx: TCtx) => boolean,
    private defaultResult: TResult
  ) {}

  clone(): this {
    return new PreExecFilterCommand(
      this.innerCmd.clone(), this.filter, this.defaultResult
    ) as this;
  }

  exec(ctx: TCtx): PromiseLike<TResult>  {
    if (this.filter(ctx) === true) {
      return this.innerCmd.exec(ctx);
    }

    return Promise.resolve(this.defaultResult)
  }
}
