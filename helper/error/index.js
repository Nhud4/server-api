const BadRequestError = require('./bad_request')
const InternalServerError = require('./internal_server_error')
const NotFoundError = require('./not_found')
const ServiceUnavailableError = require('./service_unavailable')
const UnauthorizedError = require('./unauthorized')
const UnprocessableEntityError = require('./unprocessable_entity')

module.exports = {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
  UnprocessableEntityError
}