import Result from "../util/Result";
import ApiError from "../error/ApiError";

export type ErrorCode = "ERR_UNATHORIZED" | "ERR_AUTH_TOKEN_EXPIRED" | "ERR_VALIDATION" | "ERR_CANNOT_APPROVE" | "ERR_CANNOT_CANCEL" | "ERR_REQUEST";

export interface ErrorResponse {
  readonly code: ErrorCode;
  readonly message: string;
}

export interface AuthRequest {
  readonly username: string;
  readonly passwort: string;
}

export interface AuthResponse {
  readonly authToken: string;
  readonly expiresIn: string;
}

export interface CreatePaymentRequest {
  readonly payeeId: string;
  readonly payerId: string;
  readonly paymentSystem: string;
  readonly paymentMethod: string;
  readonly amount: number;
  readonly currency: string;
  readonly comment: string;
}

export interface PaymentResponse {
  readonly id: string;
  readonly payeeId: string;
  readonly payerId: string;
  readonly paymentSystem: string;
  readonly paymentMethod: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
  readonly comment: string | null;
  readonly created: string;
  readonly updated: string;
}

export type ApiResult<TResult> = Result<TResult, ApiError>;
