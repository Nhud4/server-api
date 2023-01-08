const AppServer = require('./application/server')
const config = require('./config')
const Logger = require('./helper/utils/logger')

const appServer = new AppServer()

const { name, port, host } = config.server
const logger = new Logger()

appServer.server.listen(port, host, () => {
  logger.log('server::listen', `${name} server listening on ${host}:${port}`, 'initiate application')
})