import { promisify } from 'util'
import redisClient from './client'

export { default as redisClient } from './client'

export const zadd: (...args: any) => Promise<any> = promisify(redisClient.zadd).bind(redisClient)
export const zrangebyscore = promisify(redisClient.zrangebyscore).bind(redisClient)
export const zrem: (key: string, element: any) => Promise<any> = promisify(redisClient.zrem).bind(redisClient)
export const zremrangebyscore = promisify(redisClient.zremrangebyscore).bind(redisClient)
