import { getManager } from 'typeorm'
import { Comment } from '@/entities/comment'
import TasksService from '@/services/tasks'

type CreateCommentParams = {
  taskId: string
  creatorId: string
  text: string
}

export default async function createComment(params: CreateCommentParams): Promise<Comment> {
  const { taskId, creatorId, text } = params

  await TasksService.getTaskById(taskId)

  const comment = new Comment({ taskId, creatorId, text })

  return await getManager().save(comment)
}
