const Mongo = require('../../helper/database/mongo')
const Wrapper = require('../../helper/utils/wrapper')
const { database } = require('../../config')
const logger = require('../../helper/utils/logger')

const mongo = new Mongo(database.mongo.url)
const wrapper = new Wrapper()

class AuthRepo{
  async InserData(document){
    const ctx = 'AuthRepo::insertData'
    try {
      mongo.setCollection('user')
      const recordset = await mongo.insertOne(document)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err){
      logger.error(ctx, err.message, 'insertData::catch', err)
      return wrapper.error(err)
    }
  }

  async findOne(params){
    const ctx = 'AdminRepo::findOne'
    try {
      mongo.setCollection('user')
      const recordset = await mongo.findOne(params)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data) 
    } catch (err){
      logger.error(ctx, err.message, 'findOne::catch', err)
      return wrapper.error(err.message)
    }
  }
}

module.exports = AuthRepo