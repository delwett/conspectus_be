import { getManager } from 'typeorm'
import getTaskById from './get-task-by-id'
import BoardsService from '@/services/boards'
import ValidationError from '@/errors/validation-error'

export default async function createTask(id: string): Promise<void> {
  const task = await getTaskById(id)

  const currentBoard = await BoardsService.getCurrentBoard()

  if (task.boardId !== currentBoard.id) throw new ValidationError('Actions with tasks in old boards are prohibited')

  await getManager().remove(task)
}
