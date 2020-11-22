import { verify } from 'jsonwebtoken'
import { JwtSecret } from '@/config'
import type { TokenPayload } from './types'

export default function decodeToken(authToken: string): TokenPayload | undefined {
  try {
    const parsed: any = verify(authToken, JwtSecret)

    return parsed?.id && typeof parsed?.id === 'number' ? parsed : undefined
  } catch (e: unknown) {
    // Silent in case of incorrect token
    return undefined
  }
}
