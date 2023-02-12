const Mongo = require('../../helper/database/mongo')
const Wrapper = require('../../helper/utils/wrapper')
const { database } = require('../../config')
const logger = require('../../helper/utils/logger')

const mongo = new Mongo(database.mongo.url)
const wrapper = new Wrapper()

class SuperAdminRepo{
  async inserData(documents){
    const ctx = 'SuperAdminRepo::insertData'
    try {
      mongo.setCollection('superAdminData')
      const recordset = await mongo.insertMany(documents)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err){
      logger.error(ctx, err.message, 'insertData::catch', err)
      return wrapper.error(err.message)
    }
  }

  async findMany(params, sortParam = null){
    const ctx = 'SuperAdminRepo::findMany'
    try {
      mongo.setCollection('superAdminData')
      const recordset = await mongo.findMany(params, sortParam)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err){
      logger.error(ctx, err.message, 'findMany::catch', err)
      return wrapper.error(err.message)
    }
  }

  async delete(params){
    const ctx = 'SuperAdminRepo::delete'
    try {
      mongo.collectionName('superAdminData')
      const recordset = await mongo.deleteOne(params)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err){
      logger.error(ctx, err.message, 'findMany::catch', err)
      return wrapper.error(err.message)
    }
  }

  async findAll(sortByfield, size, page, params, sortBy){
    const ctx = 'SuperAdminRepo::findAll'
    try {
      mongo.setCollection('superAdminData')
      const recordset = await mongo.findPaginated(sortByfield, size, page, params, sortBy)
      if (recordset.err) throw recordset.err
      return wrapper.data(recordset.data)
    } catch (err){
      logger.error(ctx, err.message, 'findAll', err)
      return wrapper.error(err.message)
    }
  }
}

module.exports = SuperAdminRepo