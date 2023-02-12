const { assert } = require('chai')
const sinon = require('sinon')
const Wrapper = require('../../../../helper/utils/wrapper')
const BearerAuth = require('../bearer_auth')
const jwt = require('jsonwebtoken')

describe('bin/application/rest/authorization/bearer_auth.js', () => {
  describe('class BearerAuth', () => {
    describe('.isAuthenticated', () => {
      const bearerAuth = new BearerAuth()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if auth is not exist', () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        const req = { headers: {} }
        const result = bearerAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        Wrapper.prototype.responseError.restore()
      })
      it('should return 401 if token is not correct', () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        const req = { headers: { authorization: 'Bearer invalidToken' } }
        const result = bearerAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        Wrapper.prototype.responseError.restore()
      })
      it('should use next function if token is correct', () => {
        sinon.stub(jwt, 'verify').returns({ userId: 1 })
        const req = { headers: { authorization: 'Bearer validToken' } }
        const result = bearerAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, undefined)
        jwt.verify.restore()
      })
    })

    describe('.generateToken', () => {
      const bearerAuth = new BearerAuth()
      it('should return token', () => {
        sinon.stub(jwt, 'sign').returns('token')
        const payload = { userId: 1 }
        const result = bearerAuth.generateToken(payload)
        assert.isString(result)
        assert.deepEqual(result, 'token')
        jwt.sign.restore()
      })
    })
  })
})