const Wrapper = require('../../helper/utils/wrapper')
const Logger = require('../../helper/utils/logger')
const { InternalServerError } = require('../../helper/error')

const wrapper = new Wrapper()
const logger = new Logger()

class Test{
  async tets(req, res){
    const ctx = 'Test::test'
    try {
      const test = 'yey'

      return wrapper.response(res, 201, {
        success: true,
        code: 201,
        message: 'success to add item category',
        data: test
      })
    } catch (err){
      logger.error(ctx, err.message, 'insertItemCategory::catch.err', err)
      return wrapper.responseError(res, new InternalServerError(err.message))
    }
  }
}

module.exports = Test