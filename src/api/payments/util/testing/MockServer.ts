import { createServer as mkServer, Server } from "http"
import mockserver from 'mockserver'

export function createServer(port: number, mocksPath: string): Promise<Server> {
  return new Promise((resolve, reject) => {    
    const server = mkServer((mockserver as any)(mocksPath));

    server.once('listening', () => resolve(server))

    server.listen(port, reject)
  })
}

export function closeServer(srv: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    srv.close()
      .once('close', () => resolve())
      .once('error', (err) => reject(err))
  })
}
