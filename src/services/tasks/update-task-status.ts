import { getManager } from 'typeorm'
import { Task, TaskStatus } from '@/entities/task'
import NotFoundError from '@/errors/not-found-error'

type UpdateTaskStatusParams = {
  id: string
  status: TaskStatus
}

export default async function updateTaskStatus(params: UpdateTaskStatusParams): Promise<Task[]> {
  const { id, status } = params

  const manager = getManager()
  const task = await manager.findOne(Task, { where: { id } })

  if (!task) throw new NotFoundError('Task is not found')
  if (status === task.status) return [task]

  if (status === TaskStatus.Completed) {
    const subtasks = await getManager().find(Task, { where: { parentId: task.id, status: TaskStatus.InProgress } })

    // Update children statuses
    task.status = TaskStatus.Completed
    subtasks.forEach(task => (task.status = TaskStatus.Completed))

    return getManager().save([task, ...subtasks])
  } else {
    const parent = await manager.findOne(Task, { where: { id: task.parentId, status: TaskStatus.Completed } })

    // Update parent status too
    task.status = TaskStatus.InProgress
    if (parent) parent.status = TaskStatus.InProgress

    return getManager().save(parent ? [task, parent] : [task])
  }
}
