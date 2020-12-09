import { GraphQLFieldConfig, GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { CommentType } from '@/api/definitions'
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

const CreateCommentInput = new GraphQLInputObjectType({
  name: 'CreateCommentInput',
  fields: {
    taskId: { type: GraphQLNonNull(GraphQLID) },
    text: { type: GraphQLNonNull(GraphQLString) }
  }
})

const createComment: GraphQLFieldConfig<undefined, Context> = {
  type: CommentType,
  args: {
    createCommentInput: { type: CreateCommentInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { taskId, text } = (args as InputType).createCommentInput

    await TasksService.getTaskById(taskId)

    return CommentsService.createComment({
      taskId,
      creatorId: context.currentUser.id,
      text
    })
  }
}

export default createComment
