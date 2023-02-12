const { InternalServerError, UnprocessableEntityError, UnauthorizedError, NotFoundError } = require('../helper/utils/error')
const Password = require('../helper/utils/password')
const Auth = require('../infrastructure/repositories/auth')
const logger = require('../helper/utils/logger')
const _= require('lodash')
const { ObjectId } = require('mongodb')

const passwordUtils = new Password()
const auth = new Auth()

class UserAuth{
  async register(payload){
    const ctx = 'userAuth::register'
    try {
      const {name, phone, username, password, userCategory, kodeDesa} = payload

      const params ={phone: phone, username: username}
      const findData = await auth.findOne(params)
      if (findData.err) throw {message: 'fail to get data user'}
      if (!_.isEmpty(findData.data)){
        if (findData.data.phone === phone && findData.data.name === name){
          return {err: new UnprocessableEntityError('unprocessable entity', {
            field: 'phone or name',
            message: 'phone or name already exist',
          })}
        }
        if (findData.data.username === username){
          return {err: new UnprocessableEntityError('unprocessable entity', {
            field: 'username',
            message: 'username already exist',
          })}
        }
      }
      //   hasing password
      const hashPssword = await passwordUtils.hash(password)

      const dokument = {name, phone, username, hashPssword, userCategory, kodeDesa}
      const insertData = await auth.InserData(dokument)
      if (insertData.err) throw {message: 'fail to register'}

      return insertData
    } catch (err){
      logger.error(ctx, err.message, 'insertOrder::catch', err)
      return { err: new InternalServerError(err.message) }
    }
  }

  async login(payload){
    const ctx = 'UserAuth::login'
    try {
      const {username, password, userType} = payload

      if (userType === 'admin'){
        const params = {username: username, userCategory: userType}
        const findAdmin = await auth.findOne(params)
        if (findAdmin.err) throw {message: 'fail to get data user'}
        if (_.isEmpty(findAdmin.data)) throw {message: 'username or password is incorrect'}
        if (!_.isEmpty(findAdmin.data)){
          const isPasswordValid = await passwordUtils.compare(password, findAdmin.data.hashPssword)
          if (!isPasswordValid) {
            return new UnauthorizedError('username or password is incorrect')
          }

          return findAdmin
        }
      }

      if (userType === 'super-admin'){
        const params = {username: username, userCategory: userType}
        const findAdmin = await auth.findOne(params)
        if (findAdmin.err) throw {message: 'fail to get data user'}
        if (_.isEmpty(findAdmin.data)) throw {message: 'username or password is incorrect'}
        if (!_.isEmpty(findAdmin.data)){
          const isPasswordValid = await passwordUtils.compare(password, findAdmin.data.hashPssword)
          if (!isPasswordValid) {
            return new UnauthorizedError('username or password is incorrect')
          }

          return findAdmin
        }
      }
    } catch (err){
      logger.error(ctx, err.message, 'login::catch', err)
      return { err: new InternalServerError(err.message) }
    }
  }

  async getuser(payload){
    const ctx = 'UserAuth::getUser'
    try {
      const {uuid} = payload
      const oid = new ObjectId(uuid)
      const findUser = await auth.findOne({_id: oid})
      if (findUser.err) throw {message: 'fail to get user'}
      if (_.isEmpty(findUser.data)){
        return {err: new NotFoundError('user not found')}
      }

      return findUser
    } catch (err){
      logger.error(ctx, err.message, 'getUser::catch', err)
      return { err: new InternalServerError(err.message) }
    }
  }
}

module.exports = UserAuth