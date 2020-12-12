import { getManager } from 'typeorm'
import { isPast, isToday } from 'date-fns'
import { Board } from '@/entities/board'
import ValidationError from '@/errors/validation-error'
import toISODate from '@/utils/to-iso-date'
import getCurrentBoard from './get-current-board'

export default async function updateMeetingDate(newDate: Date): Promise<Board> {
  const currentBoard = await getCurrentBoard()

  if (isToday(new Date(currentBoard.meetingDate)))
    throw new ValidationError('Meeting date is prohibited to change during running meeting')

  if (!isToday(newDate) && isPast(newDate)) throw new ValidationError('Meeting date canot be in the past')

  currentBoard.meetingDate = toISODate(newDate)

  return getManager().save(currentBoard)
}
