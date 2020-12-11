import { getManager } from 'typeorm'
import { validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { User } from '@/entities/user'
import getUserById from './get-user-by-id'

type UpdateUserParams = {
  id: string
  firstName: string
  lastName?: string | null
  email: string
}

export default async function updateUser(params: UpdateUserParams): Promise<User | undefined> {
  const { id, firstName, lastName, email } = params

  const user = await getUserById(id)

  if (!user) return

  user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName
  user.email = email

  const errors = await validate(user)

  if (errors.length > 0) throw new ValidationError(getValidationErrorMessage(errors))

  const updatedUser = await getManager().save(user)

  return updatedUser
}
