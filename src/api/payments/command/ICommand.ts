import ICloneable from "./ICloneable";

export default interface ICommand<TResult, TCtx> extends ICloneable {
  ctx: TCtx;
  exec(): PromiseLike<TResult>;
  withCtx(ctx: TCtx): this;
}
