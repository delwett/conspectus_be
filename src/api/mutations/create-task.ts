import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { TaskType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'
import TasksService from '@/services/tasks'

type InputType = {
  createTaskInput: {
    parentId?: string | null
    description: string
  }
}

const CreateTaskInput = new GraphQLInputObjectType({
  name: 'CreateTaskInput',
  fields: {
    parentId: { type: GraphQLID },
    description: { type: GraphQLNonNull(GraphQLString) }
  }
})

const createTask: GraphQLFieldConfig<undefined, Context> = {
  type: TaskType,
  args: {
    createTaskInput: { type: CreateTaskInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { description, parentId } = (args as InputType).createTaskInput

    const currentBoard = await BoardsService.getCurrentBoard()

    return TasksService.createTask({
      boardId: currentBoard.id,
      creatorId: context.currentUser.id,
      parentId,
      description
    })
  }
}

export default createTask
