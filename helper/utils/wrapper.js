
class Wrapper {
  response(res, status, data) {
    res.status(status).json(data)
    res.end()
  }

  responseError(res, classError) {
    res.status(classError.code).json({
      message: classError.message,
      code: classError.code,
      data: classError.data,
      success: false
    })
    res.end()
  }

  data(data, message = null) {
    return { err: message, data: data }
  }

  error(message, data = null) {
    return { err: message, data }
  }
}

module.exports = Wrapper