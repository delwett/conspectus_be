import { getManager } from 'typeorm'
import { User } from '@/entities/user'

export default async function getActiveUsers(): Promise<User[]> {
  return getManager().find(User, { where: { deletedAt: null }, order: { createdAt: 'ASC' } })
}
