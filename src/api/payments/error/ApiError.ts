import { ErrorCode } from '../apitype'

export default class ApiError extends Error {

  public static fromJson (errData: {code: ErrorCode, message: string, details?: any}) {
    return new ApiError(errData.code, errData.message, errData.details)
  }
  constructor (readonly code: ErrorCode, readonly message: string, readonly details?: any) {
    super(message)
  }
}
