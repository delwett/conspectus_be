import { getManager, In } from 'typeorm'
import { Comment } from '@/entities/comment'

export default async function getCommentsByTaskIds(taskIds: string[]): Promise<Comment[]> {
  return getManager().find(Comment, { where: { taskId: In(taskIds) } })
}
