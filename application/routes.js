const packageJson = require('../package.json')
const router = require('express').Router()
const Wrapper = require('../helper/utils/wrapper')
const { NotFoundError, ServiceUnavailableError } = require('../helper/error')
const Test = require('./controller/test')

const wrapper = new Wrapper()
const test = new Test()

router.get('/test', test.tets)

router.get('/health', (_req, res) => {
  try {
    return wrapper.response(res, 200, {
      message: 'success to get health check data',
      code: 200,
      success: true,
      data: {
        uptime: process.uptime(),
        timestamp: Date.now()
      }
    })
  } catch (err) {
    return wrapper.responseError(res, new ServiceUnavailableError(err.message))
  }
})

router.get('/', (_req, res) => {
  return wrapper.response(res, 200, {
    message: `${packageJson.name} server is running properly`,
    code: 200,
    data: null,
    success: true
  })
})

// handle resource not found
router.use((_req, res) => {
  wrapper.responseError(res, new NotFoundError('resource not found'))
})

module.exports = router