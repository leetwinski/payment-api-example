import ApiRequestCommandFactory from "./command/impl/ApiRequestCommandFactory";
import AuthenticationHolder from "./service/impl/AuthenticationHolder";
import { IAuthService } from "./service/IAuthService";
import AuthService from "./service/impl/AuthService";
import { AuthRequest, AuthResponse, CreatePaymentRequest, PaymentResponse } from "./apitype";
import IPaymentService from "./service/IPaymentService";
import { always } from "./util/func";
import PaymentService from "./service/impl/PaymentService";

export default class Api {
  private readonly auth: AuthenticationHolder;
  private readonly authService: IAuthService;
  readonly payment: IPaymentService;
  
  constructor(baseUrl: string, private user: string, private password: string) {
    this.auth = new AuthenticationHolder();

    const cmdFac = new ApiRequestCommandFactory(baseUrl, this.auth);

    this.authService = new AuthService(
      cmdFac.create(always('authenticate'), 'POST')
    );

    this.payment = new PaymentService(
      cmdFac.create(always('payments'), 'POST'),
      cmdFac.create((id: string) => `payment/${id}`, 'GET'),
      cmdFac.create((id: string) => `payments/${id}/cancel`, 'PUT'),
      cmdFac.create(always('payments'), 'GET'),
      cmdFac.create((id: string) => `payments/${id}/approve`, 'PUT')
    )
  }

  async authenticate(): Promise<boolean> {
    const res = await this.authService.authenticate({username: this.user, password: this.password});

    this.auth.auth = res.unwrap();

    return true;
  }

  discardAuth(): void {
    this.auth.reset();
  }
}
