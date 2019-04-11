import IRemoteEntityRepoService from "./IRemoteEntityRepoService";
import { PaymentResponse, ApiResult, CreatePaymentRequest } from "../apitype";
export default interface IPaymentService extends IRemoteEntityRepoService<PaymentResponse, CreatePaymentRequest> {
  approve(id: string): PromiseLike<ApiResult<void>>;
}
