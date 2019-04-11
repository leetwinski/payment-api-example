export default interface ICloneable {
  clone<T extends this>(): T;
}
