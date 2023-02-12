const sinon = require('sinon')
const { assert } = require('chai')
const DriverValid = require('../driver_valid')
const Wrapper = require('../../../../helper/utils/wrapper')

describe('bin/application/rest/validation/driver_valid.js', () => {
  describe('class DriverValid', () => {
    const driverValid = new DriverValid()
    const res = {}
    const next = () => { }
    describe('.getDriverList', () => {
      it('should error validation', async () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
        const req = { query: {} }
        const result = await driverValid.getDriverList(req, res, next)
        assert.deepEqual(result, { code: 422 })
        Wrapper.prototype.responseError.restore()
      })
      it('should no error and use next function', async () => {
        const req = {
          query: {
            page: 1,
            size: 1
          }
        }
        const result = await driverValid.getDriverList(req, res, next)
        assert.deepEqual(result, undefined)
      })
    })

    describe('.insertDriver', () => {
      it('should error validation insert driver', async () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
        const req = { body: {} }
        const result = await driverValid.insertDriver(req, res, next)
        assert.deepEqual(result, { code: 422 })
        Wrapper.prototype.responseError.restore()
      })
      it('should success validation insert driver', async () => {
        const req = {
          body: {
            phone: 'sample-phone',
            password: 'test123',
            nik: 'sample-nik-16chr',
            name: 'sample-name-driver',
            placeOfBirth: 'test',
            dateOfBirth: 'test',
            address: 'test',
            vehicleMerk: 'test',
            policeNumber: 'test',
          }
        }
        const result = await driverValid.insertDriver(req, res, next)
        assert.deepEqual(result, undefined)
      })
    })

    describe('.getDriver', () => {
      it('should error validation get driver', async () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
        const req = { params: {} }
        const result = await driverValid.getDriver(req, res, next)
        assert.deepEqual(result, { code: 422 })
        Wrapper.prototype.responseError.restore()
      })
      it('should success validation get driver', async () => {
        const req = { params: { uuid: '7d786223-77ff-4c28-903a-995c5cad16e6' } }
        const result = await driverValid.getDriver(req, res, next)
        assert.deepEqual(result, undefined)
      })
    })

    describe('.deleteDriver', () => {
      it('should error validation get driver', async () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
        const req = { params: {} }
        const result = await driverValid.deleteDriver(req, res, next)
        assert.deepEqual(result, { code: 422 })
        Wrapper.prototype.responseError.restore()
      })
      it('should success validation get driver', async () => {
        const req = { params: { uuid: '7d786223-77ff-4c28-903a-995c5cad16e6' } }
        const result = await driverValid.deleteDriver(req, res, next)
        assert.deepEqual(result, undefined)
      })
    })

    describe('.updateDriver', () => {
      it('should error validation get driver', async () => {
        sinon.stub(Wrapper.prototype, 'responseError').returns({ code: 422 })
        const req = { params: {}, body: {} }
        const result = await driverValid.updateDriver(req, res, next)
        assert.deepEqual(result, { code: 422 })
        Wrapper.prototype.responseError.restore()
      })
      it('should success validation get driver', async () => {
        const req = {
          params: { uuid: '7d786223-77ff-4c28-903a-995c5cad16e6' },
          body: {
            phone: 'sample-phone',
            nik: 'sample-nik-16chr',
            name: 'sample-name-driver',
            placeOfBirth: 'test',
            dateOfBirth: 'test',
            address: 'test',
            vehicleMerk: 'test',
            policeNumber: 'test',
          }
        }
        const result = await driverValid.updateDriver(req, res, next)
        assert.deepEqual(result, undefined)
      })
    })
  })
})