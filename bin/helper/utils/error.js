class BadRequestError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'BadRequestError'
    this.code = 400
    this.data = data
  }
}

class UnauthorizedError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'UnauthorizedError'
    this.code = 401
    this.data = data
  }
}

class NotFoundError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'NotFoundError'
    this.code = 404
    this.data = data
  }
}

class UnprocessableEntityError extends Error{
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'UnprocessableEntityError'
    this.code = 422
    this.data = data
  }
}

class InternalServerError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'InternalServerError'
    this.code = 500
    this.data = data
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  UnprocessableEntityError,
  NotFoundError,
  InternalServerError
}