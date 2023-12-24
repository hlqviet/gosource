import express from 'express'

import * as userController from '@/controllers/user.controller'
import { validate } from '@/middlewares/validate'
import * as userValidation from '@/validations/user.validation'

const router = express.Router()

router
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)

export default router
