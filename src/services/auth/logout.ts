import { zrangebyscore, zrem } from '@/utils/redis'
import { TokenWhitelistPath } from './constants'

type LogoutParams = {
  id: string
  token: string
}

export default async function logout(params: LogoutParams): Promise<void> {
  const { id, token } = params

  try {
    const tokenWhitelist = await zrangebyscore(`${TokenWhitelistPath}:${id}`, '-inf', '+inf')
    if (Array.isArray(tokenWhitelist) && tokenWhitelist.includes(token)) {
      await zrem(`${TokenWhitelistPath}:${id}`, token)
    }
  } catch (e: unknown) {
    console.error(e)
    throw e
  }
}
