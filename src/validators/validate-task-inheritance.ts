import { Task } from '@/entities/task'
import ValidationError from '@/errors/validation-error'
import TasksService from '@/services/tasks'

export default async function validateTaskInheritance(task: Task): Promise<void> {
  if (task.id === task.parentId) throw new ValidationError('Task cannot reference itself')

  if (task.parentId) {
    const subtasks = await TasksService.getSubtasks([task.id])

    if (subtasks.length) throw new ValidationError('Max inheritance depth: 1')

    const parentTask = await TasksService.getTaskById(task.parentId)

    if (parentTask.parentId) throw new ValidationError('Max inheritance depth: 1')
  }
}
