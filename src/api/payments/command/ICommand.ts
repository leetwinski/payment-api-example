import ICloneable from "./ICloneable";

export default interface ICommand<TResult, TCtx = undefined> extends ICloneable {
  ctx: TCtx;
  exec(): PromiseLike<TResult>;
  withCtx(ctx: TCtx): this;
}
