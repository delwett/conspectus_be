import { getManager } from 'typeorm'
import { Task, TaskStatus } from '@/entities/task'
import ValidationError from '@/errors/validation-error'
import BoardsService from '@/services/boards'
import getTaskById from './get-task-by-id'

type UpdateTaskStatusParams = {
  id: string
  status: TaskStatus
}

export default async function updateTaskStatus(params: UpdateTaskStatusParams): Promise<Task[]> {
  const { id, status } = params

  const task = await getTaskById(id)
  const currentBoard = await BoardsService.getCurrentBoard()

  if (task.boardId !== currentBoard.id) throw new ValidationError('Actions with tasks in old boards are prohibited')
  if (status === task.status) return [task]

  if (status === TaskStatus.Completed) {
    const subtasks = await getManager().find(Task, { where: { parentId: task.id, status: TaskStatus.InProgress } })

    // Update children statuses
    task.status = TaskStatus.Completed
    subtasks.forEach(task => (task.status = TaskStatus.Completed))

    return getManager().save([task, ...subtasks])
  } else {
    const parent = await getManager().findOne(Task, { where: { id: task.parentId, status: TaskStatus.Completed } })

    // Update parent status too
    task.status = TaskStatus.InProgress
    if (parent) parent.status = TaskStatus.InProgress

    return getManager().save(parent ? [task, parent] : [task])
  }
}
