import { sign } from 'jsonwebtoken'
import { JwtSecret } from '@/config'
import type { TokenPayload } from './types'

export default function encodeToken(payload: TokenPayload): string {
  return sign(payload, JwtSecret, { expiresIn: '1d' })
}
