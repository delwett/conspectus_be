import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, TaskType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'
import TasksService from '@/services/tasks'

type InputType = {
  createTaskInput: {
    parentId?: string
    description: string
  }
}

const CreateTaskResponseType = new GraphQLObjectWithErrorType({
  name: 'CreateTaskResponseType',
  fields: {
    task: { type: TaskType }
  }
})

const CreateTaskInput = new GraphQLInputObjectType({
  name: 'CreateTaskInput',
  fields: {
    parentId: { type: GraphQLID },
    description: { type: GraphQLNonNull(GraphQLString) }
  }
})

const createTask: GraphQLFieldConfig<undefined, Context> = {
  type: CreateTaskResponseType,
  args: {
    createTaskInput: { type: CreateTaskInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { description, parentId } = (args as InputType).createTaskInput

      const currentBoard = await BoardsService.getCurrentBoard()

      const task = await TasksService.createTask({
        boardId: currentBoard.id,
        creatorId: context.currentUser.id,
        parentId,
        description
      })

      return { task }
    })
  }
}

export default createTask
