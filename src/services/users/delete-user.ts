import { getManager } from 'typeorm'
import { v4 } from 'uuid'
import ValidationError from '@/errors/validation-error'
import AuthService from '@/services/auth'
import getActiveUserById from './get-active-user-by-id'
import getActiveUsers from './get-active-users'

export default async function deleteUser(id: string): Promise<void> {
  const user = await getActiveUserById(id)

  const allActiveUsers = await getActiveUsers()

  if (allActiveUsers.length === 1) throw new ValidationError('Last users cannot be deleted')

  user.deletedAt = new Date()
  user.email = v4() + user.email

  await getManager().save(user)
  await AuthService.invalidateTokens(id)
}
