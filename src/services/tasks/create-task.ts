import { getManager } from 'typeorm'
import { validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { Task, TaskStatus } from '@/entities/task'

type CreateTaskParams = {
  boardId: string
  creatorId: string
  parentId?: string | null
  description: string
}

export default async function createTask(params: CreateTaskParams): Promise<Task> {
  const { boardId, creatorId, parentId, description } = params

  const task = new Task({ boardId, creatorId, parentId, description, status: TaskStatus.InProgress })

  const errors = await validate(task)

  if (errors.length > 0) throw new ValidationError(getValidationErrorMessage(errors))

  const savedTask = await getManager().save(task)

  return savedTask
}
