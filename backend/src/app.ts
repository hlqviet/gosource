import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

const app = express()

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(compression())
  .use(cors())

app.options('*', cors())

export default app
