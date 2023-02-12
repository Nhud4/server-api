const { InternalServerError } = require('../helper/utils/error')
const Wrapper = require('../helper/utils/wrapper')
const logger = require('../helper/utils/logger')
const AuthDomain = require('../domain/auth')

const wrapper = new Wrapper()
const authDomain = new AuthDomain()

class AuthController{
  async register(req, res){
    const ctx = 'AuthCOntroller::register'
    try {
      const payload = {...req.body}
      const insertData = await authDomain.register(payload)
      if (insertData.err) return wrapper.responseError(res, insertData.err)
      delete payload.password
      return wrapper.response(res, 200, {
        message: 'register success',
        code: 201,
        data: { ...payload },
        success: true
      })
    } catch (err){
      logger.error(ctx, err.message, 'register::catch', err)
      return wrapper.responseError(res, new InternalServerError(err.message))
    }
  }

  async getUser(req, res){
    const ctx = 'Register::getUser'
    try {
      const payload = {...req.user}
      const getUser = await authDomain.getuser(payload)
      if (getUser.err) return wrapper.responseError(res, getUser.err)
      
      const data = {
        uuid: getUser.data._id,
        name: getUser.data.name,
        phone: getUser.data.phone,
        userType: getUser.data.userCategory,
        kodeDesa: getUser.data.kodeDesa
      }

      return wrapper.response(res, 200, {
        message: 'register success',
        code: 201,
        data,
        success: true
      })
    } catch (err){
      logger.error(ctx, err.message, 'register::catch', err)
      return wrapper.responseError(res, new InternalServerError(err.message))
    }
  }
}

module.exports = AuthController