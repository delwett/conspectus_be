import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import ValidationError from '@/errors/validation-error'
import TasksService from '@/services/tasks'

type InputType = {
  updateTaskParentInput: {
    id: string
    parentId?: string | null
  }
}

const UpdateTaskParentInput = new GraphQLInputObjectType({
  name: 'UpdateTaskParentInput',
  fields: {
    id: { type: GraphQLNonNull(GraphQLID) },
    parentId: { type: GraphQLString }
  }
})

const updateTaskParent: GraphQLFieldConfig<undefined, Context> = {
  type: TaskType,
  args: {
    updateTaskParentInput: { type: UpdateTaskParentInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { id, parentId } = (args as InputType).updateTaskParentInput

    if (parentId === undefined) throw new ValidationError('Parent id value is undefined')

    return TasksService.updateTaskParent({ id, parentId })
  }
}

export default updateTaskParent
