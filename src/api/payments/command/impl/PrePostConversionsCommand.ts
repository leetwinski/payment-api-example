import AbstractCommand from '../AbstractCommand';
import ICommand from '../ICommand'

export default class PrePostConversionsCommand<TResult, TCtx, TInnerResult, TInnerCtx>
  extends AbstractCommand<TResult, TCtx> {

    constructor (
      private preConverter: (ctx: TCtx) => TInnerCtx,
      private cmd: ICommand<TInnerResult, TInnerCtx>,
      private postConverter: (result: TInnerResult) => TResult
    ) {
      super()
    }

    public clone (): this {
      return new PrePostConversionsCommand(
        this.preConverter, this.cmd.clone(), this.postConverter) as this
    }

    protected doExec (ctx: TCtx): PromiseLike<TResult> {
      return this.cmd
        .exec(this.preConverter(ctx))
        .then(this.postConverter)
    }
  }
