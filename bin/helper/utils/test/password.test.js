const { assert  } = require('chai')
const sinon = require('sinon')
const bcrypt = require('bcrypt')
const Password = require('../password')

describe('bin/helper/utils/password.js', () => {
  describe('class Password', () => {
    const password = new Password()
    describe('.hash', () => {
      it('success to hashing password', async () => {
        sinon.stub(bcrypt, 'hash').resolves('test')
        const result = await password.hash('test')
        assert.deepEqual(result, 'test')
        bcrypt.hash.restore()
      })
    })
    describe('.compare', () => {
      it('success to comapre password', async () => {
        sinon.stub(bcrypt, 'compare').resolves(true)
        const result = await password.compare('test', 'test')
        assert.deepEqual(result, true)
        bcrypt.compare.restore()
      })
    })
  })
})