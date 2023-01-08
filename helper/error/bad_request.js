class BadRequestError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'BadRequestError'
    this.code = 400
    this.data = data
  }
}

module.exports = BadRequestError