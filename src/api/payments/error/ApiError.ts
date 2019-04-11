import { ErrorCode } from "../apitype/index";

export default class ApiError extends Error {
  constructor(readonly code: ErrorCode, readonly message: string) {
    super(message);
  }

  static fromJson(errData: {code: ErrorCode, message: string}) {
    return new ApiError(errData.code, errData.message);
  }
}
