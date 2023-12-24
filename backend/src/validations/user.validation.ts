import { Role } from '@prisma/client'
import Joi from 'joi'

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.valid(...Object.values(Role)),
    lastCursor: Joi.number(),
    perPage: Joi.number()
  })
}

export { getUsers }
