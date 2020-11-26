export default class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Entity is no found')
    this.name = 'NotFoundError'
  }
}
