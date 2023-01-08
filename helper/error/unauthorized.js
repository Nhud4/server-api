
class UnauthorizedError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'UnauthorizedError'
    this.code = 401
    this.data = data
  }
}

module.exports = UnauthorizedError