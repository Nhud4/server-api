class ServiceUnavailable extends Error {
  constructor(message, data = null) {
    super(message)
    this.message = message
    this.name = 'ServiceUnavailable'
    this.code = 503
    this.data = data
  }
}

module.exports = ServiceUnavailable