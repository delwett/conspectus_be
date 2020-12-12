import { getManager } from 'typeorm'
import NotFoundError from '@/errors/not-found-error'
import { User } from '@/entities/user'

export default async function getActiveUserByEmail(email: string): Promise<User> {
  const user = await getManager().findOne(User, { where: { email, deletedAt: null } })

  if (!user) throw new NotFoundError('User is not found')

  return user
}
