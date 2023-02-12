const router = require('express').Router()
const BearerAuth = require('../rest/authorization/bearer_auth')
const BasicAuth = require('../rest/authorization/basic_auth')

const bearerAuth = new BearerAuth()
const basicAuth = new BasicAuth()

router.post('/auth/v1/login', bearerAuth.isAuthenticated)
router.post('/auth/v1/admin/register', basicAuth.isAuthenticated)
router.get('/auth/v1/user/profile', bearerAuth.isAuthenticated)

module.exports = router