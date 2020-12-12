import { getManager } from 'typeorm'
import bcrypt from 'bcrypt'
import { zadd } from '@/utils/redis'
import { User } from '@/entities/user'
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

  const user = await getManager().findOne(User, { where: { email } })

  if (!user) throw NotFound

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) throw NotFound

  const token = encodeToken({ id: user.id })
  const tokenExpTimestamp = Date.now() + TokenLifetime

  await zadd(`${TokenWhitelistPath}:${user.id}`, tokenExpTimestamp, token)

  return token
}
