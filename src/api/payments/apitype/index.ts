import ApiError from '../error/ApiError'
import Result from '../util/Result'

export type ErrorCode = 'ERR_UNATHORIZED' | 'ERR_AUTH_TOKEN_EXPIRED' | 'ERR_VALIDATION' | 'ERR_CANNOT_APPROVE' | 'ERR_CANNOT_CANCEL' | 'ERR_REQUEST'

// tslint:disable-next-line:interface-name
export interface ErrorResponse {
  readonly code: ErrorCode
  readonly message: string
}

// tslint:disable-next-line:interface-name
export interface AuthRequest {
  readonly username: string
  readonly password: string
}

// tslint:disable-next-line:interface-name
export interface AuthResponse {
  readonly authToken: string
  readonly expiresIn: string
}

// tslint:disable-next-line:interface-name
export interface CreatePaymentRequest {
  readonly payeeId: string
  readonly payerId: string
  readonly paymentSystem: string
  readonly paymentMethod: string
  readonly amount: number
  readonly currency: string
  readonly comment: string
}

// tslint:disable-next-line:interface-name
export interface PaymentResponse {
  readonly id: string
  readonly payeeId: string
  readonly payerId: string
  readonly paymentSystem: string
  readonly paymentMethod: string
  readonly amount: number
  readonly currency: string
  readonly status: string
  readonly comment: string | null
  readonly created: string
  readonly updated: string
}

export type ApiResult<TResult> = Result<TResult, ApiError>
