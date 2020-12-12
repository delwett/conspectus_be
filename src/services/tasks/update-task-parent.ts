import { getManager } from 'typeorm'
import { Task } from '@/entities/task'
import ValidationError from '@/errors/validation-error'
import BoardsService from '@/services/boards'
import getTaskById from './get-task-by-id'

type UpdateTaskParentParams = {
  id: string
  parentId: string | null
}

export default async function updateTaskParent(params: UpdateTaskParentParams): Promise<Task> {
  const { id, parentId } = params

  const task = await getTaskById(id)
  const currentBoard = await BoardsService.getCurrentBoard()

  if (task.boardId !== currentBoard.id) throw new ValidationError('Actions with tasks in old boards are prohibited')

  task.parentId = parentId

  return getManager().save(task)
}
