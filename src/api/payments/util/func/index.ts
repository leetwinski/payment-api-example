const identity = <T>(val: T): T => val;

function always<T, R>(retVal: R) {
  return (param: T) => retVal;
}

export {
  identity,
  always
}
