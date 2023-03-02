import { HttpErrorStatusCode } from '../constants/httpErrorCodeStatus'

export class ResourceNotFoundError extends Error {
  statusCode = HttpErrorStatusCode.NOT_FOUND

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

export class NotAuthorizedError extends Error {
  statusCode = HttpErrorStatusCode.UNAUTHORIZED

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
