import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import TasksService from '@/services/tasks'

type InputType = {
  updateTaskInput: {
    id: string
    parentId?: string | null
    description?: string | null
  }
}

const UpdateTaskInput = new GraphQLInputObjectType({
  name: 'UpdateTaskInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    parentId: { type: GraphQLID },
    description: { type: GraphQLString }
  }
})

const updateTask: GraphQLFieldConfig<undefined, Context> = {
  type: TaskType,
  args: {
    updateTaskInput: { type: UpdateTaskInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id, parentId, description } = (args as InputType).updateTaskInput

    return TasksService.updateTask(id, {
      parentId,
      description
    })
  }
}

export default updateTask
