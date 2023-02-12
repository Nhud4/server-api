const { assert } = require('chai')
const sinon = require('sinon')
const Wrapper = require('../wrapper')
const { InternalServerError } = require('../error')

describe('bin/helper/utils/wrapper.js', () => {
  describe('class Wrapper', () => {
    const wrapper = new Wrapper()
    describe('.response', () => {
      it('success to response', () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub().returnsThis(),
          end: sinon.stub()
        }
        wrapper.response(res, 200, { data: 'data' })
        assert.equal(res.status.calledWith(200), true)
        assert.equal(res.json.calledWith({ data: 'data' }), true)
        assert.equal(res.end.calledOnce, true)
      })
    })
    describe('.responseError', () => {
      it('success to responseError', () => {
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub().returnsThis(),
          end: sinon.stub()
        }
        wrapper.responseError(res, new InternalServerError('error'))
        assert.equal(res.status.calledWith(500), true)
        assert.equal(res.json.calledWith({
          message: 'error',
          code: 500,
          data: null,
          success: false
        }), true)
        assert.equal(res.end.calledOnce, true)
      })
    })
    describe('.data', () => {
      it('success to data', () => {
        assert.deepEqual(wrapper.data({ data: 'data' }),
          { err: null, data: { data: 'data' } })
      })
    })
    describe('.error', () => {
      it('success to error', () => {
        assert.deepEqual(wrapper.error('error'),
          { err: 'error', data: null })
      })
    })
  })
})