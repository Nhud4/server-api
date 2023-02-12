const { InternalServerError } = require('../../../helper/utils/error')
const Wrapper = require('../../../helper/utils/wrapper')
const logger = require('../../../helper/utils/logger')
const SuperAdminDomain = require('../../../domain/super_admin')

const wrapper = new Wrapper()
const domain = new SuperAdminDomain()

class SuperAdminController{
  async uploadFile(req, res){
    const ctx = 'SuperAdminController::uploadFIle'
    try {
      const payload = {...req.file}
      payload.user = req.user
      payload.path = req.file.path

      const uploadData = await domain.uploadFile(payload)
      if (uploadData.err) return wrapper.responseError(res, uploadData.err)

      return wrapper.response(res, 200, {
        message: 'register success',
        code: 201,
        data: uploadData.data,
        success: true
      })
    } catch (err){
      logger.error(ctx, err.message, 'uploadFile::catch', err)
      return wrapper.responseError(res, new InternalServerError(err.message))
    }
  }
}

module.exports = SuperAdminController