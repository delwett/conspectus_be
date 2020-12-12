import { getManager } from 'typeorm'
import NotFoundError from '@/errors/not-found-error'
import { Board, BoardStatus } from '@/entities/board'

export default async function getCurrentBoard(): Promise<Board> {
  const currentBoard = await getManager().findOne(Board, {
    where: { status: BoardStatus.Pending }
  })

  if (!currentBoard) throw new NotFoundError('Board is not found')

  return currentBoard
}
