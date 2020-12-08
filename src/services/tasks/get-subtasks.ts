import { getManager, In } from 'typeorm'
import { Task } from '@/entities/task'

export default async function getSubtasks(parentIds: string[]): Promise<Task[]> {
  return getManager().find(Task, { where: { parentId: In(parentIds) } })
}
