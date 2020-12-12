import { getManager } from 'typeorm'
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

  const savedTask = await getManager().save(task)

  return savedTask
}
