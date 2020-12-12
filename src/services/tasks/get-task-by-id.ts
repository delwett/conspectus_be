import { getManager } from 'typeorm'
import NotFoundError from '@/errors/not-found-error'
import { Task } from '@/entities/task'

export default async function getTaskById(id: string): Promise<Task> {
  const task = await getManager().findOne(Task, { where: { id } })

  if (!task) throw new NotFoundError('Task is not found')

  return task
}
