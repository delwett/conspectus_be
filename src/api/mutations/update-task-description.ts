import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import TasksService from '@/services/tasks'

type InputType = {
  updateTaskDescriptionInput: {
    id: string
    description: string
  }
}

const UpdateTaskDescriptionInput = new GraphQLInputObjectType({
  name: 'UpdateTaskDescriptionInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLNonNull(GraphQLString) }
  }
})

const updateTaskDescription: GraphQLFieldConfig<undefined, Context> = {
  type: TaskType,
  args: {
    updateTaskDescriptionInput: { type: UpdateTaskDescriptionInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id, description } = (args as InputType).updateTaskDescriptionInput

    return TasksService.updateTaskDescription({ id, description })
  }
}

export default updateTaskDescription
