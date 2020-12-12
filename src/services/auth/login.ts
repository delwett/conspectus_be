import bcrypt from 'bcrypt'
import { zadd } from '@/utils/redis'
import UsersService from '@/services/users'
import NotFoundError from '@/errors/not-found-error'
import encodeToken from './encode-token'
import { TokenWhitelistPath, TokenLifetime } from './constants'

type LoginParameters = {
  email: string
  password: string
}

const NotFound = new NotFoundError('Incorrect email or password')

export default async function login(parameters: LoginParameters): Promise<string | undefined> {
  const { email, password } = parameters

  const user = await UsersService.getActiveUserByEmail(email).catch((e: unknown) => {
    if (e instanceof NotFoundError) throw NotFound
    throw e
  })

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) throw NotFound

  const token = encodeToken({ id: user.id })
  const tokenExpTimestamp = Date.now() + TokenLifetime

  await zadd(`${TokenWhitelistPath}:${user.id}`, tokenExpTimestamp, token)

  return token
}
