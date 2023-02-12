const router = require('express').Router()
const BearerAuth = require('../rest/authorization/bearer_auth')
const BasicAuth = require('../rest/authorization/basic_auth')
const AuthController = require('../../auth/register')
const Login = require('../../auth/login')

const bearerAuth = new BearerAuth()
const basicAuth = new BasicAuth()
const register = new AuthController()
const login = new Login()

router.post('/auth/v1/login', basicAuth.isAuthenticated, login.login)
router.post('/auth/v1/admin/register', basicAuth.isAuthenticated, register.register)
router.get('/auth/v1/user/profile', bearerAuth.isAuthenticated, register.getUser)

module.exports = router