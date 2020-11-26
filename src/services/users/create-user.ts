import bcrypt from 'bcrypt'
import { getManager } from 'typeorm'
import { validate } from 'class-validator'
import ValidationError from '@/errors/validation-error'
import { User } from '@/entities/user'

type CreateUserParams = {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export default async function createUser(params: CreateUserParams): Promise<User | undefined> {
  const { firstName, lastName, email, password } = params

  if (password.length < 6) throw new ValidationError(`Incorrect password length. Min 6 symbols`)

  const paswordHash = await bcrypt.hash(password, 10)

  const user = new User({ firstName, lastName, email, password: paswordHash })

  const errors = await validate(user)

  if (errors.length > 0)
    throw new ValidationError(
      errors.map(({ constraints }) => (constraints ? Object.values(constraints)[0] : '')).join('. ')
    )

  const savedUser = await getManager().save(user)

  return savedUser
}
