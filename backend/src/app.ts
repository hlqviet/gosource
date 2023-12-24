import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'

import { errorHandler } from '@/middlewares/error'
import * as morgan from '@/middlewares/morgan'
import routes from '@/routes'

const app = express()

app
  .use(morgan.successHandler)
  .use(morgan.errorHandler)
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())
  .options('*', cors())
  .use('/api', routes)
  .use((_req, _res, next) => {
    next(new Error(`${httpStatus.NOT_FOUND}: Not found`))
  })
  .use(errorHandler)

export default app
