import { ApiResult, CreatePaymentRequest, PaymentResponse } from '../apitype'
import IRemoteEntityRepoService from './IRemoteEntityRepoService'
export default interface IPaymentService extends IRemoteEntityRepoService<PaymentResponse, CreatePaymentRequest> {
  approve (id: string): PromiseLike<ApiResult<void>>
}
