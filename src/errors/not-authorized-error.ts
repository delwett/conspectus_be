export default class NotAuthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Not authorized')
    this.name = 'NotAuthorizedError'
  }
}
