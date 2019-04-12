import ICommand from "../ICommand";

export default class PreExecFilterCommand<TResult, TCtx> implements ICommand<TResult, TCtx> {
  constructor(
    private filter: (ctx: TCtx) => boolean,
    private defaultResult: TResult,
    private innerCmd: ICommand<TResult, TCtx>
  ) {}

  clone(): this {
    return new PreExecFilterCommand(
      this.filter, this.defaultResult, this.innerCmd.clone()
    ) as this;
  }

  exec(ctx: TCtx): PromiseLike<TResult>  {
    if (this.filter(ctx) === true) {
      return this.innerCmd.exec(ctx);
    }

    return Promise.resolve(this.defaultResult)
  }
}
