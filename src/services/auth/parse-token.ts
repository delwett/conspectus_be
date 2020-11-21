import { verify } from 'jsonwebtoken'
import { JwtSecret } from '@/config'

export default function parseToken(authToken: string): string | object | undefined {
  try {
    return authToken ? verify(authToken, JwtSecret) : undefined
  } catch (e: unknown) {
    // Silent in case of incorrect token
    return undefined
  }
}
