import { getManager } from 'typeorm'
import { Comment } from '@/entities/comment'

type CreateCommentParams = {
  taskId: string
  creatorId: string
  text: string
}

export default async function createComment(params: CreateCommentParams): Promise<Comment> {
  const { taskId, creatorId, text } = params

  const comment = new Comment({ taskId, creatorId, text })

  return await getManager().save(comment)
}
