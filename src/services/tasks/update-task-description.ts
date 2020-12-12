import { getManager } from 'typeorm'
import { Task } from '@/entities/task'
import ValidationError from '@/errors/validation-error'
import BoardsService from '@/services/boards'
import getTaskById from './get-task-by-id'

type UpdateTaskDescriptionParams = {
  id: string
  description: string
}

export default async function updateTaskDescription(params: UpdateTaskDescriptionParams): Promise<Task> {
  const { id, description } = params

  const task = await getTaskById(id)
  const currentBoard = await BoardsService.getCurrentBoard()

  if (task.boardId !== currentBoard.id) throw new ValidationError('Actions with tasks in old boards are prohibited')

  task.description = description

  return getManager().save(task)
}
