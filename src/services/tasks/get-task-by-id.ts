import { getManager } from 'typeorm'
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound'
import NotFoundError from '@/errors/not-found-error'
import { Task } from '@/entities/task'

export default async function getTaskById(id: string): Promise<Task> {
  try {
    const task = await getManager().findOne(Task, { where: { id } })

    if (!task) throw new NotFoundError('Task is not found')

    return task
  } catch (e: unknown) {
    if (e instanceof EntityColumnNotFound) throw new NotFoundError('Task is not found')

    throw e
  }
}
