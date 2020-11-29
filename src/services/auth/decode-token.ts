import { verify } from 'jsonwebtoken'
import { JwtSecret } from '@/config'
import { zrangebyscore, zremrangebyscore } from '@/utils/redis'
import { TokenWhitelistPath } from './constants'
import type { TokenPayload } from './types'

export default async function decodeToken(authToken: string): Promise<TokenPayload | undefined> {
  try {
    const parsed: any = verify(authToken, JwtSecret)

    const result: TokenPayload | undefined = parsed?.id && typeof parsed.id === 'string' ? parsed : undefined

    if (!result) return

    // TODO: separate functionality below

    await zremrangebyscore(`${TokenWhitelistPath}:${result.id}`, '-inf', Date.now())

    const tokenWhitelist = await zrangebyscore(`${TokenWhitelistPath}:${result.id}`, '-inf', '+inf')

    if (Array.isArray(tokenWhitelist) && tokenWhitelist.includes(authToken)) return result
  } catch (e: unknown) {
    console.error(e)
    return undefined
  }
}
