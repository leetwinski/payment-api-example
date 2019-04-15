// tslint:disable no-unused-expression

import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised';
import { Server } from 'http';
import Api from './Api'
import { ApiResult, PaymentResponse } from './apitype';
import { closeServer, createServer } from './util/testing/MockServer';

const expect = chai.use(chaiAsPromised).expect;

const SERVER_PORT = 9999;

const mkTest = <T>(name: string,
                   fn: () => PromiseLike<ApiResult<T>>,
                   propCheck: (val: T) => void = (_) => undefined) =>
  it(name, async () => {
    const res = await fn()

    expect(res.isError).to.be.false

    propCheck(res.unwrap())
  })

describe('Api', () => {
  let srv: Server;
  const api: Api = new Api('http://localhost:' + SERVER_PORT + '/v1', 'user', 'pass');

  before(
    async () => {
      srv = await createServer(SERVER_PORT, './mocks')
      await api.authenticate();
    }
  )

  after(
    () => closeServer(srv)
  )

  mkTest("list payments ok", () => api.payment.list())

  mkTest("create payment ok", () => api.payment.create(
    {
      amount: 1,
      comment: "aaa",
      currency: "RUB",
      payeeId: "1010",
      payerId: "2020",
      paymentMethod: "some",
      paymentSystem: "paypal",
    }
  ))

  mkTest("get payment ok", () => api.payment.get("1000"))

  mkTest("approve payment ok", () => api.payment.approve("1000"))  

  mkTest('cancel payment ok', () => api.payment.delete("1000"))
})
