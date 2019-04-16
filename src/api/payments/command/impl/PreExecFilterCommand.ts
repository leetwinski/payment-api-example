import AbstractCommand from '../AbstractCommand';
import ICommand from '../ICommand'

export default class PreExecFilterCommand<TResult, TCtx> extends AbstractCommand<TResult, TCtx> {
  constructor (
    private filter: (ctx: TCtx) => boolean,
    private defaultResult: TResult,
    private innerCmd: ICommand<TResult, TCtx>
  ) {
    super()
  }

  public clone (): this {
    return new PreExecFilterCommand(
      this.filter, this.defaultResult, this.innerCmd.clone()
    ) as this
  }

  protected doExec (ctx: TCtx): PromiseLike<TResult> {
    if (this.filter(ctx) === true) {
      return this.innerCmd.exec(ctx)
    }

    return Promise.resolve(this.defaultResult)
  }
}
