export class GraphqlResourceNotFoundError extends Error {
  statusCode = 404

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  serialize() {
    return {
      error: {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
      },
    }
  }
}
