import 'dotenv/config'

import Joi from 'joi'

const schema = Joi.object<{
  NODE_ENV: 'development' | 'production'
  PORT: number
  DATABASE_URL: string
}>()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required()
  })
  .unknown()

const { value: variables, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Environment variables error: ${error.message}`)
}

export default {
  environment: variables.NODE_ENV,
  port: variables.PORT,
  databaseUrl: variables.DATABASE_URL
}
