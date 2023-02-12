const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../../../helper/utils/error')
const Wrapper = require('../../../helper/utils/wrapper')
const { bearerAuth } = require('../../../config')

const { privateKey } = bearerAuth
const wrapper = new Wrapper()

class BearerAuth {

  isAuthenticated(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) {
      return wrapper.responseError(res, new UnauthorizedError('bearer auth is required'))
    }
    const token = req.headers.authorization.split(' ')[1]
    // const [, token] = auth.split(' ')
    try {
      const decoded = jwt.verify(token, privateKey)
      req.user = decoded
      next()
    } catch (err) {
      return wrapper.responseError(res, new UnauthorizedError('bearer auth is error'))
    }
  }

  generateToken(payload, options = {}) {
    return jwt.sign(payload, privateKey, options)
  }

}

module.exports = BearerAuth