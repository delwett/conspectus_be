import { getManager } from 'typeorm'
import { Task } from '@/entities/task'

export default async function getRootTasks(boardId: string): Promise<Task[]> {
  return await getManager().find(Task, { where: { boardId, parentId: null }, order: { createdAt: 'DESC' } })
}
