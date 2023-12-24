import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import Joi from 'joi'

export const validate =
  (schemaObject: {
    query?: Joi.ObjectSchema
    params?: Joi.ObjectSchema
    body?: Joi.ObjectSchema
  }): RequestHandler =>
  (req, _res, next) => {
    const object = { query: req.query }
    const { value, error } = Joi.compile(schemaObject)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object)

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ')

      return next(new Error(`${httpStatus.BAD_REQUEST}: ${errorMessage}`))
    }

    Object.assign(req, value)

    return next()
  }
