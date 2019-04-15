import { AuthRequest, AuthResponse, CreatePaymentRequest, PaymentResponse } from './apitype'
import ApiRequestCommandFactory from './command/impl/ApiRequestCommandFactory'
import { IAuthService } from './service/IAuthService'
import AuthenticationHolder from './service/impl/AuthenticationHolder'
import AuthService from './service/impl/AuthService'
import PaymentService from './service/impl/PaymentService'
import IPaymentService from './service/IPaymentService'
import { always } from './util/func'

export default class Api {
  public readonly payment: IPaymentService
  private readonly auth: AuthenticationHolder
  private readonly authService: IAuthService

  constructor (baseUrl: string, private user: string, private password: string) {
    this.auth = new AuthenticationHolder()

    const cmdFac = new ApiRequestCommandFactory(baseUrl, this.auth)

    this.authService = new AuthService(
      cmdFac.create(always('authenticate'), 'POST', false)
    )

    this.payment = new PaymentService(
      cmdFac.create(always('payments'), 'POST'),
      cmdFac.create((id: string) => `payment/${id}`, 'GET'),
      cmdFac.create((id: string) => `payments/${id}/cancel`, 'PUT'),
      cmdFac.create(always('payments'), 'GET'),
      cmdFac.create((id: string) => `payments/${id}/approve`, 'PUT')
    )
  }

  public async authenticate (): Promise<boolean> {
    const res = await this.authService.authenticate({ username: this.user, password: this.password })
    
    this.auth.updateAuth(res.unwrap())

    return true
  }

  public discardAuth (): void {
    this.auth.reset()
  }
}
