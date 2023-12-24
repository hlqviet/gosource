import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { errorHandler } from '@/middlewares/error'
import * as morgan from '@/middlewares/morgan'

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
  .use(errorHandler)

export default app
