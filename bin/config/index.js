const packageJson = require('../../package.json')
const dotenv = require('dotenv')

dotenv.config()
const config = {
  server: {
    name: packageJson.name,
    port: process.env.PORT || 3000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD
  },
  bearerAuth: {
    privateKey: process.env.BEARER_AUTH_PRIVATE_KEY,
  },
  database: {
    postgres: {
      url: process.env.POSTGRES_URL,
    },
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://:supersecret@localhost:27017/database?authSource=admin'
    }
  }
}

module.exports = config