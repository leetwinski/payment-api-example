// tslint:disable no-unused-expression

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised';
import { Server } from 'http';
import Api from './Api'
import { closeServer, createServer } from './util/testing/MockServer';

const expect = chai.use(chaiAsPromised).expect;

const SERVER_PORT = 9999;

describe('Api.auth', () => {
  let srv: Server;
  const api: Api = new Api('http://localhost:' + SERVER_PORT + '/v1', 'user', 'pass');

  before(
    async () => {
      srv = await createServer(SERVER_PORT, './mocks')
    }
  )

  after(
    () => closeServer(srv)
  )

  it('api auth ok', () => {
    expect(api.authenticate()).to.eventually.be.true
  })  
})
