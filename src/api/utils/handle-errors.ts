import NotFoundError from '@/errors/not-found-error'
import NotAuthorizedError from '@/errors/not-authorized-error'
import ValidationError from '@/errors/validation-error'

type ErrorField = {
  error: {
    code: number
    message: string
  }
}

export default async function handleErrors<T>(
  promiseOrFunction: Promise<T> | (() => Promise<T>),
  resolveCustomErrors?: (e: unknown) => ErrorField | undefined
): Promise<T | ErrorField> {
  const promise = typeof promiseOrFunction === 'function' ? promiseOrFunction() : promiseOrFunction

  return await promise.catch((e: unknown) => {
    const customErrors = resolveCustomErrors?.(e)
    if (customErrors) return customErrors

    return {
      error: parseError(e)
    }
  })
}

function parseError(e: unknown): ErrorField['error'] {
  if (e instanceof NotFoundError)
    return {
      code: 404,
      message: e.message
    }

  if (e instanceof NotAuthorizedError)
    return {
      code: 403,
      message: e.message
    }

  if (e instanceof ValidationError)
    return {
      code: 400,
      message: e.message
    }

  console.error(e)
  return {
    code: 500,
    message: 'Server error!'
  }
}
