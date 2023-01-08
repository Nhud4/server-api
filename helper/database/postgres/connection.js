const { Pool } = require('pg')

const connectionPool = []

const addConnectionPool = (config, connection) => {
  if (!connectionPool.find(pool => pool.config === config)) {
    connectionPool.push({
      config,
      connection
    })
  }
}

const createConnection = async (config) => {
  const currConnection = connectionPool.findIndex(pool => pool.config === config)
  let pool = null
  if (currConnection === -1) {
    pool = new Pool(config)
    if (pool) addConnectionPool(config, pool)
  }
  return pool
}

const getConnection = async (config) => {
  const currConnection = connectionPool.filter(pool => pool.config === config)
  let conn = null
  currConnection.map((connPool, index) => {
    if (index === 0) {
      conn = connPool.connection
    }
  })
  return conn
}

module.exports = {
  connectionPool,
  createConnection,
  getConnection
}