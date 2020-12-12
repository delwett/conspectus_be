import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from 'graphql'
import { TaskStatusEnum, TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import { TaskStatus } from '@/entities/task'
import TasksService from '@/services/tasks'

type InputType = {
  updateTaskStatusInput: {
    id: string
    status: TaskStatus
  }
}

const UpdateTaskStatusInput = new GraphQLInputObjectType({
  name: 'UpdateTaskStatusInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    status: { type: GraphQLNonNull(TaskStatusEnum) }
  }
})

const updateTaskStatus: GraphQLFieldConfig<undefined, Context> = {
  type: new GraphQLList(TaskType),
  args: {
    updateTaskStatusInput: { type: UpdateTaskStatusInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id, status } = (args as InputType).updateTaskStatusInput

    return TasksService.updateTaskStatus({ id, status })
  }
}

export default updateTaskStatus
