import { getManager } from 'typeorm'
import getTaskById from './get-task-by-id'
import BoardsService from '@/services/boards'
import ValidationError from '@/errors/validation-error'
import { TaskStatus } from '@/entities/task'

export default async function createTask(id: string): Promise<void> {
  const task = await getTaskById(id)

  const currentBoard = await BoardsService.getCurrentBoard()

  if (task.boardId !== currentBoard.id) throw new ValidationError('Actions with tasks in old boards are prohibited')
  if (task.status === TaskStatus.Completed) throw new ValidationError('Deletion of completed task is not allowed')

  await getManager().remove(task)
}
