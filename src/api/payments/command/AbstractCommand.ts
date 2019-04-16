import ICommand from "./ICommand";

export default abstract class AbstractCommand<TResult, TCtx> implements ICommand<TResult, TCtx> {
  protected cachedResult: PromiseLike<TResult> = null;
  private executed: boolean = false

  public exec(ctx: TCtx): PromiseLike<TResult> {
    if (this.isExecuted() === true) {
      return this.cachedResult
    }

    this.cachedResult = this.doExec(ctx)

    return this.cachedResult
  }

  public isExecuted(): boolean {
    return this.executed
  }

  public abstract clone(): this

  protected abstract doExec(ctx: TCtx): PromiseLike<TResult>
}
