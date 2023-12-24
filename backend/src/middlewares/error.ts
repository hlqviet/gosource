import { ErrorRequestHandler } from 'express'
import httpStatus from 'http-status'

import config from '@/config/config'
import logger from '@/config/logger'

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  let { statusCode, message } = err

  if (config.environment === 'production') {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.environment === 'development' && { stack: err.stack })
  }

  if (config.environment === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}

export { errorHandler }
