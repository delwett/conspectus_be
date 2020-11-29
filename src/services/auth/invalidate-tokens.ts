import { zremrangebyscore } from '@/utils/redis'
import { TokenWhitelistPath } from './constants'

export default async function invalidateTokens(id: string): Promise<void> {
  await zremrangebyscore(`${TokenWhitelistPath}:${id}`, '-inf', '+inf')
}
