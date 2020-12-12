import { getManager } from 'typeorm'
import { User } from '@/entities/user'
import getUserById from './get-user-by-id'

type UpdateUserParams = {
  id: string
  firstName: string
  lastName?: string | null
  email: string
}

export default async function updateUser(params: UpdateUserParams): Promise<User> {
  const { id, firstName, lastName, email } = params

  const user = await getUserById(id)

  user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName
  user.email = email

  return getManager().save(user)
}
