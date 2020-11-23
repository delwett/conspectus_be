import { verify } from 'jsonwebtoken'
import { promisify } from 'util'
import { JwtSecret } from '@/config'
import redisClient from '@/utils/redis-client'
import { BlacklistTokenPath } from './constants'
import type { TokenPayload } from './types'

const get = promisify(redisClient.get).bind(redisClient)

export default async function decodeToken(authToken: string): Promise<TokenPayload | undefined> {
  try {
    const isTokenBlacklisted = await Boolean(get(`${BlacklistTokenPath}.${authToken}`))

    if (isTokenBlacklisted) return

    const parsed: any = verify(authToken, JwtSecret)

    return parsed?.id && typeof parsed?.id === 'number' ? parsed : undefined
  } catch (e: unknown) {
    console.error(e)
    return undefined
  }
}
