import { promisify } from 'util'
import redisClient from '@/utils/redis-client'
import { BlacklistTokenPath } from './constants'

const setex = promisify(redisClient.setex).bind(redisClient)

const SecondsInDay = 60 * 60 * 24

export default async function logout(token: string): Promise<void> {
  try {
    await setex(`${BlacklistTokenPath}.${token}`, SecondsInDay, token)
  } catch (e: unknown) {
    console.error(e)
    throw e
  }
}
