import { getManager } from 'typeorm'
import { Task, TaskStatus } from '@/entities/task'
import ValidationError from '@/errors/validation-error'
import BoardsService from '@/services/boards'
import getTaskById from './get-task-by-id'

type CreateTaskParams = {
  creatorId: string
  parentId?: string | null
  description: string
}

export default async function createTask(params: CreateTaskParams): Promise<Task> {
  const { creatorId, parentId, description } = params

  const currentBoard = await BoardsService.getCurrentBoard()

  const task = new Task({ boardId: currentBoard.id, creatorId, parentId, description, status: TaskStatus.InProgress })

  if (parentId) {
    const parentTask = await getTaskById(parentId)
    if (parentTask.status === TaskStatus.Completed)
      throw new ValidationError('Adding subtasks for completed task is prohibited')
  }

  return getManager().save(task)
}
