import { expect } from 'chai'
import { createServer, Server } from 'http';
import * as mockserver from 'mockserver'
import Api from './Api'

const SERVER_PORT = 9999;
const getSrv = (path: string) => (mockserver as any)(path);

function mkServer(): Promise<Server> {
  return new Promise((resolve, reject) => {    
    const srv = createServer(getSrv('../../../mocks'));

    srv.once('listening', () => resolve(srv))

    srv.listen(SERVER_PORT, reject)
  })
}

describe('initial', () => {
  let srv: Server;

  before(
    async () => {
      srv = await mkServer()
    }
  )

  after(
    () => {
      srv.close()
    }
  )

  it('should pass', () => {
    expect(1).to.be.equal(1);
  })
})
