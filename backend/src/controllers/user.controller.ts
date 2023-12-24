import { Role } from '@prisma/client'
import { RequestHandler } from 'express'

import { userService } from '@/services'

const getUsers: RequestHandler = async (req, res) => {
  const { query } = req
  const users = await userService.getUsers(
    {
      name: query.name as string,
      role: query.role as Role
    },
    {
      lastCursor: query.lastCursor as number | undefined,
      perPage: query.perPage as number | undefined
    }
  )

  res.send(users)
}

export { getUsers }
