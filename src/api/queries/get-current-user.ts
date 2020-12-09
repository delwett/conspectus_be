import { GraphQLFieldConfig } from 'graphql'
import handleErrors from '@/api/utils/handle-errors'
import { GraphQLObjectWithErrorType, UserType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'

const CurrentUserResponseType = new GraphQLObjectWithErrorType({
  name: 'CurrentUser',
  fields: {
    currentUser: { type: UserType }
  }
})

const getCurrentUser: GraphQLFieldConfig<undefined, Context> = {
  type: CurrentUserResponseType,
  resolve: async (_, __, context) => {
    return handleErrors(async () => {
      if (!context.currentUser) throw new NotAuthorizedError()

      return { currentUser: context.currentUser }
    })
  }
}

export default getCurrentUser
