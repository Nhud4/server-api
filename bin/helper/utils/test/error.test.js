const { expect } = require('chai')
const {
  BadRequestError,
  UnauthorizedError,
  UnprocessableEntityError,
  NotFoundError,
  InternalServerError
} = require('../error')

describe('bin/helper/utils/error.js', () => {
  describe('class BadRequestError', () => {
    it('should return instance of BadRequestError', () => {
      const result = new BadRequestError('message')
      expect(result).to.be.an.instanceof(BadRequestError)
    })
  })
  describe('class UnauthorizedError', () => {
    it('should return instance of UnauthorizedError', () => {
      const result = new UnauthorizedError('message')
      expect(result).to.be.an.instanceof(UnauthorizedError)
    })
  })
  describe('class UnprocessableEntityError', () => {
    it('should return instance of UnprocessableEntityError', () => {
      const result = new UnprocessableEntityError('message')
      expect(result).to.be.an.instanceof(UnprocessableEntityError)
    })
  })
  describe('class NotFoundError', () => {
    it('should return instance of NotFoundError', () => {
      const result = new NotFoundError('message')
      expect(result).to.be.an.instanceof(NotFoundError)
    })
  })
  describe('class InternalServerError', () => {
    it('should return instance of InternalServerError', () => {
      const result = new InternalServerError('message')
      expect(result).to.be.an.instanceof(InternalServerError)
    })
  })
})