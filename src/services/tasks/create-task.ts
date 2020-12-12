import { getManager } from 'typeorm'
import { Task, TaskStatus } from '@/entities/task'
import BoardsService from '@/services/boards'

type CreateTaskParams = {
  creatorId: string
  parentId?: string | null
  description: string
}

export default async function createTask(params: CreateTaskParams): Promise<Task> {
  const { creatorId, parentId, description } = params

  const currentBoard = await BoardsService.getCurrentBoard()

  const task = new Task({ boardId: currentBoard.id, creatorId, parentId, description, status: TaskStatus.InProgress })

  return getManager().save(task)
}
