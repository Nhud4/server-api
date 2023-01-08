class NotFoundError extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'NotFoundError'
    this.code = 404
    this.data = data
  }
}

module.exports = NotFoundError