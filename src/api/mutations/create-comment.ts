import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLObjectWithErrorType, CommentType } from '@/api/definitions'
import handleErrors from '@/api/utils/handle-errors'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import TasksService from '@/services/tasks'
import CommentsService from '@/services/comments'

type InputType = {
  createCommentInput: {
    taskId: string
    text: string
  }
}

const CreateCommentResponseType = new GraphQLObjectWithErrorType({
  name: 'CreateCommentResponseType',
  fields: {
    comment: { type: CommentType }
  }
})

const CreateCommentInput = new GraphQLInputObjectType({
  name: 'CreateCommentInput',
  fields: {
    taskId: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) }
  }
})

const createComment: GraphQLFieldConfig<undefined, Context> = {
  type: CreateCommentResponseType,
  args: {
    createCommentInput: { type: CreateCommentInput }
  },
  resolve: async (_, args, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      const { taskId, text } = (args as InputType).createCommentInput

      await TasksService.getTaskById(taskId)

      const comment = await CommentsService.createComment({
        taskId,
        creatorId: context.currentUser.id,
        text
      })

      return { comment }
    })
  }
}

export default createComment
