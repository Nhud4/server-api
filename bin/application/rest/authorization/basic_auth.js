const { UnauthorizedError } = require('../../../helper/utils/error')
const { basicAuth } = require('../../../config')
const Wrapper = require('../../../helper/utils/wrapper')
const wrapper = new Wrapper()

const { username, password } = basicAuth

class BasicAuth {

  isAuthenticated(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) {
      return wrapper.responseError(res, new UnauthorizedError('basic auth is required'))
    }
    const [, base64] = auth.split(' ')
    const [usernameReq, passwordReq] = Buffer.from(base64, 'base64').toString().split(':')
    if (usernameReq !== username || passwordReq !== password) {
      return wrapper.responseError(res, new UnauthorizedError('basic auth is error'))
    }
    next()
  }
}

module.exports = BasicAuth