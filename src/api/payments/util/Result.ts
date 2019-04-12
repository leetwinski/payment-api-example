export default class Result<R, E extends Error> {
  public static ok<R, E extends Error> (result: R): Result<R, E> {
    return new Result<R, E>(result)
  }

  public static err<R, E extends Error> (error: E): Result<R, E> {
    return new Result<R, E>(undefined, error, true)
  }

  public static trySync<R, E extends Error> (fn: () => R, errFn: (err: Error) => E): Result<R, E> {
    try {
      return Result.ok<R, E>(fn())
    } catch (err) {
      return Result.err(errFn(err))
    }
  }

  public static async tryAsync<R, E extends Error> (fn: () => Promise<R>, errFn: (err: Error) => E): Promise<Result<R, E>> {
    try {
      return Result.ok<R, E>(await fn())
    } catch (err) {
      return Result.err(errFn(err))
    }
  }

  private constructor (private result?: R, private error?: E, readonly isError: boolean = false) { }

  public unwrap (): R {
    if (this.isError) {
      throw this.error
    }

    return this.result
  }

  public map<R1> (fn: (res: R) => R1): Result<R1, E> {
    if (!this.isError) {
      return Result.ok(fn(this.result))
    }

    return Result.err<R1, E>(this.error)
  }
}
