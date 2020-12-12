import { GraphQLFieldConfig, GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { BoardType } from '@/api/definitions'
import type { Context } from '@/api/types'
import NotAuthorizedError from '@/errors/not-authorized-error'
import BoardsService from '@/services/boards'

type InputType = {
  updateMeetingDateInput: {
    date: Date
  }
}

const UpdateMeetingDateInput = new GraphQLInputObjectType({
  name: 'UpdateMeetingDateInput',
  fields: {
    date: { type: GraphQLNonNull(GraphQLDate) }
  }
})

const updateMeetingDate: GraphQLFieldConfig<undefined, Context> = {
  type: BoardType,
  args: {
    updateMeetingDateInput: { type: UpdateMeetingDateInput }
  },
  resolve: async (_, args, context) => {
    if (!context.currentUser) throw new NotAuthorizedError()

    const { date } = (args as InputType).updateMeetingDateInput

    return BoardsService.updateMeetingDate(date)
  }
}

export default updateMeetingDate
