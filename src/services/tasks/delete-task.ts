import { getManager } from 'typeorm'
import getTaskById from './get-task-by-id'

export default async function createTask(id: string): Promise<void> {
  const task = await getTaskById(id)

  await getManager().remove(task)
}
