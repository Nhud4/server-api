const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoConnPool = require('../helper/database/mongo/connection')
const { database } = require('../config')

const app = express()

app.set('x-powered-by', false)
app.set('etag', false)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', routes)

// mongo init
mongoConnPool.init(database.mongo.url)

module.exports = app