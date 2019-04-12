import { ApiResult, CreatePaymentRequest, PaymentResponse } from '../../apitype'
import ICommand from '../../command/ICommand'
import IPaymentService from '../IPaymentService'
import CommandBasedRepoService from './CommandBasedRepoService'

export default class PaymentService extends CommandBasedRepoService<PaymentResponse, CreatePaymentRequest> implements IPaymentService {
  constructor (
    createCommand: ICommand<ApiResult<PaymentResponse>, CreatePaymentRequest>,
    getCommand: ICommand<ApiResult<PaymentResponse>, string>,
    deleteCommand: ICommand<ApiResult<void>, string>,
    listCommand: ICommand<ApiResult<PaymentResponse[]>, undefined>,
    private approveCommand: ICommand<ApiResult<void>, string>
  ) {
    super(createCommand, getCommand, deleteCommand, listCommand)
  }

  public approve (id: string): PromiseLike<ApiResult<void>> {
    return this.approveCommand.clone().exec(id)
  }
}
