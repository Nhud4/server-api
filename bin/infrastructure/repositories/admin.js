const Mongo = require('../../helper/database/mongo')
const Wrapper = require('../../helper/utils/wrapper')
const { database } = require('../../config')
const logger = require('../../helper/utils/logger')

const mongo = new Mongo(database.mongo.url)
const wrapper = new Wrapper()

class AdminRepo{
  async findAll(params, sortParam = null) {
    const ctx = 'AdminRepo::findAll'
    try {
      mongo.setCollection('adminData')
      const recordset = await mongo.findMany(params, sortParam)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err) {
      logger.error(ctx, err.message, 'findAll::catch', err)
      return wrapper.error(err.message)
    }
  }

  async findOne(params){
    const ctx = 'AdminRepo::findOne'
    try {
      mongo.setCollection('adminData')
      const recordset = await mongo.findOne(params)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data) 
    } catch (err){
      logger.error(ctx, err.message, 'findOne::catch', err)
      return wrapper.error(err.message)
    }
  }
}

module.exports = AdminRepo