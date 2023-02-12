const { assert } = require('chai')
const sinon = require('sinon')
const Wrapper = require('../../../../helper/utils/wrapper')
const BasicAuth = require('../basic_auth')
const { basicAuth } = require('../../../../config')
const { username, password } = basicAuth

describe('bin/application/rest/authorization/basic_auth.js', () => {
  describe('class BasicAuth', () => {
    describe('.isAuthenticated', () => {
      const basicAuth = new BasicAuth()
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis()
      }
      it('should return 401 if auth is not exist', () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        const req = { headers: {} }
        const result = basicAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        Wrapper.prototype.responseError.restore()
      })
      it('should return 401 if username auth is not correct', () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        const authorization = 'Basic ' + Buffer.from(`false:${password}`).toString('base64')
        const req = { headers: { authorization } }
        const result = basicAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        Wrapper.prototype.responseError.restore()
      })

      it('should return 401 if password auth is not correct', () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 401 })
        const authorization = 'Basic ' + Buffer.from(`${username}:false`).toString('base64')
        const req = { headers: { authorization } }
        const result = basicAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, { code: 401 })
        Wrapper.prototype.responseError.restore()
      })

      it('should use next function if username and password auth is correct', () => {
        const authorization = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
        const req = { headers: { authorization } }
        const result = basicAuth.isAuthenticated(req, res, () => { })
        assert.deepEqual(result, undefined)
      })
    })
  })
})