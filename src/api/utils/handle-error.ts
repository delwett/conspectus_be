import { GraphQLError } from 'graphql'
import NotFoundError from '@/errors/not-found-error'
import NotAuthorizedError from '@/errors/not-authorized-error'
import ValidationError from '@/errors/validation-error'

type ResponseErrorType = {
  code: number
  message: string
}

export default function handleError(gqlErr: GraphQLError): ResponseErrorType {
  const originalError = gqlErr.originalError

  if (!originalError) {
    console.error(gqlErr)

    return {
      code: 500,
      message: `GraphQL error: ${gqlErr.message}`
    }
  }

  console.error(originalError)

  if (originalError instanceof NotFoundError)
    return {
      code: 404,
      message: originalError.message
    }

  if (originalError instanceof NotAuthorizedError)
    return {
      code: 403,
      message: originalError.message
    }

  if (originalError instanceof ValidationError)
    return {
      code: 400,
      message: originalError.message
    }

  return {
    code: 500,
    message: `Server error: ${originalError.message}`
  }
}
