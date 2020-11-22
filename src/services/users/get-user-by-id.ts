import { getManager } from 'typeorm'
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound'
import NotFoundError from '@/errors/not-found-error'
import { User } from '@/entities/user'

export default async function getUserById(id: number): Promise<User | undefined> {
  try {
    const entityManager = getManager()

    return entityManager.findOne(User, { where: { id } })
  } catch (e: unknown) {
    if (e instanceof EntityColumnNotFound) throw new NotFoundError('User is not found')

    throw e
  }
}
