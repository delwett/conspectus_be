import { getManager } from 'typeorm'
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound'
import NotFoundError from '@/errors/not-found-error'
import { Board, BoardStatus } from '@/entities/board'

export default async function getCurrentBoard(): Promise<Board> {
  try {
    const currentBoard = await getManager().findOne(Board, {
      where: { status: BoardStatus.Pending }
    })

    if (!currentBoard) throw new NotFoundError('Board is not found')

    return currentBoard
  } catch (e: unknown) {
    if (e instanceof EntityColumnNotFound) throw new NotFoundError('Board is not found')

    throw e
  }
}
