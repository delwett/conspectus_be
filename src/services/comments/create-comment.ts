import { getManager } from 'typeorm'
import { validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { Comment } from '@/entities/comment'

type CreateCommentParams = {
  taskId: string
  creatorId: string
  text: string
}

export default async function createComment(params: CreateCommentParams): Promise<Comment> {
  const { taskId, creatorId, text } = params

  const comment = new Comment({ taskId, creatorId, text })

  const errors = await validate(comment)

  if (errors.length > 0) throw new ValidationError(getValidationErrorMessage(errors))

  return await getManager().save(comment)
}
