import { getManager } from 'typeorm'
import { Task } from '@/entities/task'
import NotFoundError from '@/errors/not-found-error'

type UpdateTaskParentParams = {
  id: string
  parentId: string | null
}

export default async function updateTaskParent(params: UpdateTaskParentParams): Promise<Task> {
  const { id, parentId } = params

  const manager = getManager()
  const task = await manager.findOne(Task, { where: { id } })

  if (!task) throw new NotFoundError('Task is not found')

  task.parentId = parentId

  return manager.save(task)
}
