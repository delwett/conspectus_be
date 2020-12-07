import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, TaskType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'
import TasksService from '@/services/tasks'
import type { GraphQLFieldConfig } from '../types'

type InputType = {
  newTaskInput: {
    parentId?: string
    description: string
  }
}

const NewTaskPayload = new GraphQLObjectWithErrorType({
  name: 'NewTaskPayload',
  fields: {
    task: { type: TaskType }
  }
})

const NewTaskInput = new GraphQLInputObjectType({
  name: 'NewTaskInput',
  fields: {
    parentId: { type: GraphQLID },
    description: { type: GraphQLNonNull(GraphQLString) }
  }
})

const newTask: GraphQLFieldConfig = {
  type: NewTaskPayload,
  args: {
    newTaskInput: { type: NewTaskInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { description, parentId } = (args as InputType).newTaskInput

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

export default newTask
