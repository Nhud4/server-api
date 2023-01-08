class UnprocessableEntityError extends Error{
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'UnprocessableEntityError'
    this.code = 422
    this.data = data
  }
}

module.exports = UnprocessableEntityError