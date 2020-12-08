import { getManager } from 'typeorm'
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound'
import NotFoundError from '@/errors/not-found-error'
import { User } from '@/entities/user'

export default async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await getManager().findOne(User, { where: { id } })

    if (!user) throw new NotFoundError('User is not found')

    return user
  } catch (e: unknown) {
    if (e instanceof EntityColumnNotFound) throw new NotFoundError('User is not found')

    throw e
  }
}
