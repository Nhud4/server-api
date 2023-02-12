const server = require('./bin/application/server')
const config = require('./bin/config')
const logger = require('./bin/helper/utils/logger')

const { name, port, host } = config.server

server.listen(port, host, () => {
  logger.info('server', `[server] ${name} server listening on ${host}:${port}`, 'index')
})