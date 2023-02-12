const _ = require('lodash')
const mongoConnection = require('./connection')
const Wrapper = require('../../utils/wrapper')
const logger = require('../../utils/logger')

const wrapper = new Wrapper()

class DB {
  constructor(config) {
    this.config = config
  }

  setCollection(collectionName) {
    this.collectionName = collectionName
  }

  async getDatabase() {
    const config = this.config.replace('//', '')
    /* eslint no-useless-escape: "error" */
    const pattern = new RegExp('/([a-zA-Z0-9-_]+)?')
    const dbName = pattern.exec(config)
    return dbName[1]
  }

  async findOne(params) {
    const ctx = 'mongodb-findOne'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const recordset = await db.findOne(params)
      if (_.isEmpty(recordset)) {
        return wrapper.data(null)
      }
      return wrapper.data(recordset)

    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb')
      return wrapper.error(`Error Find One Mongo ${err.message}`)
    }
  }

  async findMany(params, sortParam = {}) {
    const ctx = 'mongodb-findMany'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const recordset = await db.find(params).sort(sortParam).toArray()
      if (_.isEmpty(recordset)) {
        return wrapper.data([])
      }
      return wrapper.data(recordset)

    } catch (err) {
      logger.log(ctx, err.message, 'Error find data in mongodb')
      return wrapper.error(`Error Find Many Mongo ${err.message}`)
    }
  }

  async findPaginated(sortByfield, size, page, params, sortBy = null) {
    const ctx = 'mongodb-findPaginated'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      // const sortParam = { [sortByfield]: 1 }
      const sortParam = { [sortByfield]: sortBy ? sortBy : 1}
      const pageParam = size * (page - 1)
      const recordset = await db.find(params).sort(sortParam).limit(size).skip(pageParam)
        .toArray()
      const { data: totalData } = await this.countAll(params)
      if (_.isEmpty(recordset)) {
        return wrapper.paginationData([], {
          totalData,
          totalPage: 1
        })
      }
      return wrapper.paginationData(recordset, {
        totalData,
        totalPage: Math.ceil(totalData / size)
      })

    } catch (err) {
      logger.log(ctx, err.message, 'Error find paginated data')
      return wrapper.error(`Error Mongo ${err.message}`)
    }
  }

  async insertOne(document) {
    const ctx = 'mongodb-insertOne'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const recordset = await db.insertOne(document)
      if (recordset.acknowledged !== true) {
        return wrapper.error('Failed Inserting Data to Database')
      }
      return wrapper.data(document)

    } catch (err) {
      logger.log(ctx, err.message, 'Error insert data in mongodb')
      return wrapper.error(`Error Insert One Mongo ${err.message}`)
    }
  }

  async insertMany(documents) {
    const ctx = 'mongodb-insertMany'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const recordset = await db.insertMany(documents)
      if (recordset.insertedCount < 1) {
        return wrapper.error('Failed Inserting Data to Database')
      }
      return wrapper.data(documents)

    } catch (err) {
      logger.log(ctx, err.message, 'Error insert data in mongodb')
      return wrapper.error(`Error Insert Many Mongo ${err.message}`)
    }
  }

  async updateOne(params, updateDocument, increment) {
    const ctx = 'mongodb-updateOne'
    const dbName = await this.getDatabase()
    const query =  {}
    if (increment){
      query.$inc = increment
    }
    if (updateDocument){
      query.$set = updateDocument
    }
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const data = await db.updateOne(params, query)
      if (data.modifiedCount >= 0) {
        const recordset = await this.findOne(params)
        return wrapper.data(recordset.data)
      }
      return wrapper.error('Failed updating data')
    } catch (err) {
      logger.log(ctx, err.message, 'Error update data in mongodb')
      return wrapper.error(`Error Update Mongo ${err.message}`)
    }
  }

  async upsertOne(params, updateDocument) {
    const ctx = 'mongodb-upsertOne'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const data = await db.updateOne(params, { $set: updateDocument }, { upsert: true })
      if (data.upsertedCount >= 0) {
        const recordset = await this.findOne(params)
        return wrapper.data(recordset.data)
      }
      return wrapper.error('Failed upserting data')
    } catch (err) {
      logger.log(ctx, err.message, 'Error upsert data in mongodb')
      return wrapper.error(`Error Upsert Mongo ${err.message}`)
    }
  }

  async deleteOne(params) {
    const ctx = 'mongodb-deleteOne'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const data = await db.deleteOne(params)
      if (data.deletedCount > 0) {
        return wrapper.data(true)
      }
      return wrapper.error('Failed deleting data')
    } catch (err) {
      logger.log(ctx, err.message, 'Error upsert data in mongodb')
      return wrapper.error(`Error Upsert Mongo ${err.message}`)
    }
  }

  async countAll(params, customDBName = null) {
    const ctx = 'mongodb-countAll'
    const dbName = customDBName || await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const count = await db.countDocuments(params)
      return wrapper.data(count)

    } catch (err) {
      logger.log(ctx, err.message, 'Error count data in mongodb')
      return wrapper.error(`Error Mongo ${err.message}`)
    }
  }
  async aggregate(pipeline) {
    const ctx = 'mongodb-aggregate'
    const dbName = await this.getDatabase()
    const result = await mongoConnection.getConnection(this.config)
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection')
      return result
    }
    try {
      const cacheConnection = result.data.db
      const connection = cacheConnection.db(dbName)
      const db = connection.collection(this.collectionName)
      const recordset = await db.aggregate(pipeline, { 'allowDiskUse': true }).toArray()
      if (_.isEmpty(recordset)) {
        return wrapper.data([])
      }
      return wrapper.data(recordset)
    } catch (err) {
      logger.log(ctx, err.message, 'Error aggregation in mongodb')
      return wrapper.error(`Error Aggregation Mongo ${err.message}`)
    }
  }
}

module.exports = DB