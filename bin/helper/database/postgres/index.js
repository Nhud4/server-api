const _ = require('lodash')
const dbConnection = require('./connection')

class Postgres {
  config
  constructor(config) {
    this.config = config
  }

  async query(text, params) {

    let db = await dbConnection.getConnection(this.config)
    if (_.isEmpty(db)) {
      db = await dbConnection.createConnection(this.config)
    }
    const recordset = () => {
      return new Promise((resolve, reject) => {
        db.connect((err, connection, done) => {
          if (err) {
            let errorMessage
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              errorMessage = 'Database connection was closed.'
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
              errorMessage = 'Database has too many connections.'
            }
            if (err.code === 'ECONNREFUSED') {
              errorMessage = 'Database connection was refused.'
            }
            if (err.code === 'ENOTFOUND') {
              errorMessage = 'Database connection was not found.'
            }
            done()
            reject({ err: errorMessage })
          } else {
            connection.query(text, params, (err, result) => {
              done()
              if (err) {
                reject({ err: err.message })
              } else {
                resolve({ data: result.rows })
              }
            })
          }
        })
      })
    }
    const result = await recordset().then(result => {
      return result
    }).catch(err => {
      return err
    })
    return result
  }
}

module.exports = Postgres