import bcrypt from 'bcrypt'
import { getManager } from 'typeorm'
import ValidationError from '@/errors/validation-error'
import { User } from '@/entities/user'

type CreateUserParams = {
  firstName: string
  lastName?: string | null
  email: string
  password: string
}

export default async function createUser(params: CreateUserParams): Promise<User> {
  const { firstName, lastName, email, password } = params

  if (password.length < 6) throw new ValidationError(`Incorrect password length. Min 6 symbols`)

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ firstName, lastName, email, password: passwordHash })

  return getManager().save(user)
}
