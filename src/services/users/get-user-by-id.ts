import { getManager } from 'typeorm'
import NotFoundError from '@/errors/not-found-error'
import { User } from '@/entities/user'

export default async function getUserById(id: string): Promise<User> {
  const user = await getManager().findOne(User, { where: { id } })

  if (!user) throw new NotFoundError('User is not found')

  return user
}
