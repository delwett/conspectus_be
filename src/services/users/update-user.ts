import { getManager, QueryFailedError } from 'typeorm'
import { User } from '@/entities/user'
import ValidationError from '@/errors/validation-error'
import getActiveUserById from './get-active-user-by-id'

type UpdateUserParams = {
  id: string
  firstName: string
  lastName?: string | null
  email: string
}

export default async function updateUser(params: UpdateUserParams): Promise<User> {
  const { id, firstName, lastName, email } = params

  const user = await getActiveUserById(id)

  user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName
  user.email = email

  try {
    return await getManager().save(user)
  } catch (e: unknown) {
    if (e instanceof QueryFailedError) throw new ValidationError('Selected email already present')
    throw e
  }
}
