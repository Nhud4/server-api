const router = require('express').Router()
const BearerAuth = require('../rest/authorization/bearer_auth')
const BasicAuth = require('../rest/authorization/basic_auth')
const Controller = require('../rest/controllers/super_admin')

const bearerAuth = new BearerAuth()
const basicAuth = new BasicAuth()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const controllers = new Controller()

router.post('/dvt/v1/super/admin/upload', bearerAuth.isAuthenticated, upload.single('file'), controllers.uploadFile)
router.post('/auth/v1/admin/register', basicAuth.isAuthenticated)
router.get('/auth/v1/user/profile', bearerAuth.isAuthenticated)

module.exports = router