const compression = require('compression')
const express = require('express')
const cors = require('cors')

class AppServer {

  constructor() {
    this.server = express()
    this.server.set('x-powered-by', false)
    this.server.set('etag', false)
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(cors())
    this.server.use(compression())
  }
}

module.exports = AppServer