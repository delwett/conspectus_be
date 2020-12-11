import { getManager } from 'typeorm'
import { validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { Task, TaskStatus } from '@/entities/task'
import getTaskById from './get-task-by-id'

type UpdateTaskParams = {
  parentId?: string | null
  description?: string | null
}

export default async function updateTask(id: string, params: UpdateTaskParams): Promise<Task> {
  const { parentId, description } = params

  if (!parentId && !description) throw new ValidationError('Nothing to update in task')

  const task = await getTaskById(id)

  if (task.status === TaskStatus.Completed) throw new ValidationError('Completed task cannot updated')

  if (parentId !== undefined) task.parentId = parentId
  if (description) task.description = description

  const errors = await validate(task)

  if (errors.length > 0) throw new ValidationError(getValidationErrorMessage(errors))

  const savedTask = await getManager().save(task)

  return savedTask
}
