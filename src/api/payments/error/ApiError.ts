import { ErrorCode } from '../apitype'

export default class ApiError extends Error {

  public static fromJson (errData: {code: ErrorCode, message: string}) {
    return new ApiError(errData.code, errData.message)
  }
  constructor (readonly code: ErrorCode, readonly message: string) {
    super(message)
  }
}
