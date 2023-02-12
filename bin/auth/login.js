const { addDays, formatISO } = require('date-fns')
const { InternalServerError } = require('../helper/utils/error')
const BearerAuth = require('../application/rest/authorization/bearer_auth')
const Wrapper = require('../helper/utils/wrapper')
const logger = require('../helper/utils/logger')
const AuthDomain = require('../domain/auth')

const wrapper = new Wrapper()
const authDomain = new AuthDomain()
const bearerAuth = new BearerAuth()

class Login{
  async login(req, res){
    const ctx = 'Login::login'
    try {
      const payload = {...req.body}
      const getUser = await authDomain.login(payload)
      if (getUser.err) return wrapper.responseError(res, getUser.err)

      let payloadToken = {}
      let data = {}
    
      if (payload.userType === 'admin'){
        payloadToken = {
          uuid: getUser.data._id,
          phone: getUser.data.phone,
          username: getUser.data.phone,
          name: getUser.data.name,
          userType: payload.userType
        }

        data = {
          accessToken: bearerAuth.generateToken(payloadToken, { expiresIn: '1d' }),
          expAccessToken: formatISO(addDays(new Date(), 1)),
        }
      }

      return wrapper.response(res, 200, {
        message: 'login success',
        code: 200,
        data,
        success: true
      })
    } catch (err){
      logger.error(ctx, err.message, 'register::catch', err)
      return wrapper.responseError(res, new InternalServerError(err.message))
    }
  }
}

module.exports = Login