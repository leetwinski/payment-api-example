import { RequestListener } from 'http';

declare function mockserver(mocksPath: string): RequestListener

export default mockserver
