import { getManager } from 'typeorm'
import bcrypt from 'bcrypt'
import NotFoundError from '@/errors/not-found-error'
import ValidationError from '@/errors/validation-error'
import getUserById from './get-user-by-id'

type UpdatePasswordParams = {
  id: string
  oldPassword: string
  newPassword: string
}

export default async function updatePassword(params: UpdatePasswordParams): Promise<void> {
  const { id, oldPassword, newPassword } = params

  const user = await getUserById(id)

  const valid = await bcrypt.compare(oldPassword, user.password)

  if (!valid) throw new NotFoundError('Wrong old password')

  if (newPassword.length < 6) throw new ValidationError(`Incorrect new password length. Min 6 symbols`)

  const paswordHash = await bcrypt.hash(newPassword, 10)

  user.password = paswordHash

  await getManager().save(user)
}
