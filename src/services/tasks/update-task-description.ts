import { getManager } from 'typeorm'
import { Task } from '@/entities/task'
import NotFoundError from '@/errors/not-found-error'

type UpdateTaskDescriptionParams = {
  id: string
  description: string
}

export default async function updateTaskDescription(params: UpdateTaskDescriptionParams): Promise<Task> {
  const { id, description } = params

  const manager = getManager()
  const task = await manager.findOne(Task, { where: { id } })

  if (!task) throw new NotFoundError('Task is not found')

  task.description = description

  return manager.save(task)
}
