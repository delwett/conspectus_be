import { GraphQLBoolean, GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import TasksService from '@/services/tasks'

type InputType = {
  deleteTaskInput: {
    id: string
  }
}

const DeleteTaskInput = new GraphQLInputObjectType({
  name: 'DeleteTaskInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) }
  }
})

const deleteTask: GraphQLFieldConfig<undefined, Context> = {
  type: GraphQLBoolean,
  args: {
    deleteTaskInput: { type: DeleteTaskInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id } = (args as InputType).deleteTaskInput

    return TasksService.deleteTask(id)
  }
}

export default deleteTask
