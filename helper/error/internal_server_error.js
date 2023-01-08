class InternalServerError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'InternalServerError'
    this.code = 500
    this.data = data
  }
}

module.exports = InternalServerError