import { ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Board } from '@/entities/board'
import { Comment } from '@/entities/comment'
import { Task } from '@/entities/task'
import { User } from '@/entities/user'
import { createUsersAndBoards1607195261587 } from '@/migrations/1607195261587-create-users-and-boards'
import { addTasksWithRel1607261537645 } from '@/migrations/1607261537645-add-tasks-with-rel'
import { addComments1607455858617 } from '@/migrations/1607455858617-add-comments'
import { addDeletedAtToUsers1607798132971 } from '@/migrations/1607798132971-add-deleted-at-to-users'

export const Stage = process.env.STAGE ?? 'development'
export const JwtSecret = process.env.JWT_SECRET ?? ''
export const Port = Number(process.env.PORT) ?? 8000
export const ApiPath = process.env.API_PATH ?? '/graphql'
export const ApiPlaygroundPath = process.env.API_PLAYGROUND_PATH ?? '/playground'
export const Host = process.env.HOST ?? 'localhost'

export const SmtpHost = process.env.SMTP_HOST ?? 'smtp.yandex.ru'
export const SmtpUser = process.env.SMTP_USER ?? 'user'
export const SmtpPass = process.env.SMTP_PASS ?? 'pass'
export const EmailFrom = process.env.EMAIL_FROM ?? 'test@test.test'

export const Connection: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  logger: 'advanced-console',
  entities: [Board, Comment, Task, User],
  migrations: [
    createUsersAndBoards1607195261587,
    addTasksWithRel1607261537645,
    addComments1607455858617,
    addDeletedAtToUsers1607798132971
  ],
  cli: {
    migrationsDir: 'src/migrations'
  }
}
