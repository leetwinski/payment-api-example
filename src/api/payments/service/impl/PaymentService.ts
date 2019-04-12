import CommandBasedRepoService from "./CommandBasedRepoService";
import IPaymentService from "../IPaymentService";
import { PaymentResponse, CreatePaymentRequest, ApiResult } from "../../apitype";
import ICommand from "../../command/ICommand";

export default class PaymentService extends CommandBasedRepoService<PaymentResponse, CreatePaymentRequest> implements IPaymentService {
  constructor(
    createCommand: ICommand<ApiResult<PaymentResponse>, CreatePaymentRequest>,
    getCommand: ICommand<ApiResult<PaymentResponse>, string>,
    deleteCommand: ICommand<ApiResult<void>, string>,
    listCommand: ICommand<ApiResult<PaymentResponse[]>, undefined>,
    private approveCommand: ICommand<ApiResult<void>, string>
  ) {
    super(createCommand, getCommand, deleteCommand, listCommand);
  }

  approve(id: string): PromiseLike<ApiResult<void>> {
    return this.approveCommand.clone().exec(id);
  }
}
