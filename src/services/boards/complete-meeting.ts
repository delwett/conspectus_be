import { getManager } from 'typeorm'
import { addWeeks, isPast, startOfWeek } from 'date-fns'
import toISODate from '@/utils/to-iso-date'
import ValidationError from '@/errors/validation-error'
import { Task, TaskStatus } from '@/entities/task'
import { Board, BoardStatus } from '@/entities/board'
import emailTransport, { from } from '@/services/email-transport'
import getActiveUsers from '../users/get-active-users'
import getCurrentBoard from './get-current-board'

export default async function completeMeeting(): Promise<void> {
  const currentBoard = await getCurrentBoard()
  const meetingDate = new Date(currentBoard.meetingDate)

  if (!isPast(meetingDate)) throw new ValidationError('Not started meeting is prohibited to complete')

  const startOfNextWeek = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
  const newBoard = new Board({ meetingDate: toISODate(startOfNextWeek), status: BoardStatus.Pending })
  currentBoard.status = BoardStatus.Finished

  const savedNewBoard = await getManager().save(newBoard)
  await getManager().save(currentBoard)

  const currentTasks = await getManager().find(Task, {
    where: { boardId: currentBoard.id }
  })

  const finishedTaskDescriptions = currentTasks
    .filter(task => task.status === TaskStatus.Completed)
    .map(task => task.description)
    .join('\n  ')

  currentTasks.forEach(task => {
    if (task.status === TaskStatus.Completed) {
      task.parentId = null
    } else {
      task.boardId = savedNewBoard.id
    }
  })

  await getManager().save(currentTasks)

  const activeUsers = await getActiveUsers()
  const participantEmails = activeUsers.map(user => user.email).join(', ')

  sendMail({
    to: participantEmails,
    startDate: currentBoard.meetingDate,
    text: `Finished tasks:\n  ${finishedTaskDescriptions}`
  }).catch(e => {
    console.error('Send mail process finished with an error', e.message)
    throw e
  })
}

type SendMailParams = {
  to: string
  startDate: string
  text: string
}

async function sendMail(params: SendMailParams): Promise<void> {
  const { to, startDate, text } = params

  await emailTransport.sendMail({
    from,
    to,
    subject: `Meeting started at ${startDate} has been finished`,
    text
  })

  console.log(`Email has been sent to ${to}`)
}
