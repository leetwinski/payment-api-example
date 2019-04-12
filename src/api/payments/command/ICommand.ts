import ICloneable from "./ICloneable";

export default interface ICommand<TResult, TCtx> extends ICloneable {
  exec(ctx: TCtx): PromiseLike<TResult>;
}
