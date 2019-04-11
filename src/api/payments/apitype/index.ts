import Result from "../util/Result";
import ApiError from "../error/ApiError";

export type ErrorCode = "ERR_UNATHORIZED" | "ERR_AUTH_TOKEN_EXPIRED" | "ERR_VALIDATION" | "ERR_CANNOT_APPROVE" | "ERR_CANNOT_CANCEL" | "ERR_REQUEST";

export interface ErrorResponse {
  code: ErrorCode;
  message: string;
}

export interface AuthRequest {
  username: string;
  passwort: string;
}

export interface AuthResponse {
  authToken: string;
  expiresIn: string;
}

export interface Auth {
  authToken: string;
  expiresIn: Date;
}

export interface CreatePaymentRequest {
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  comment: string;
}

export interface PaymentResponse {
  id: string;
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  comment: string | null;
  created: string;
  updated: string;
}

export interface Payment {
  id: string;
  payeeId: string;
  payerId: string;
  paymentSystem: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  comment: string | null;
  created: Date;
  updated: Date;
}

export type ApiResult<TResult> = Result<TResult, ApiError>;
