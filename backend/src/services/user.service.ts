import { Prisma, Role, User } from '@prisma/client'

import { PER_PAGE } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { PaginatedResponse, Pagination } from '@/lib/types'

const getUsers = async (
  filter: { name?: string; role?: Role } = {},
  pagination: Pick<Pagination, 'lastCursor' | 'perPage'>
): Promise<PaginatedResponse<User>> => {
  const { name, role } = filter
  const { lastCursor, perPage } = pagination
  const take = perPage || PER_PAGE

  const nameCriteria: Prisma.UserWhereInput = {
    OR: [
      {
        firstName: {
          contains: name,
          mode: 'insensitive'
        }
      },
      {
        lastName: {
          contains: name,
          mode: 'insensitive'
        }
      }
    ]
  }

  const roleCriteria: Prisma.UserWhereInput = {
    AND: {
      role: {
        equals: role
      }
    }
  }

  const result = await prisma.user.findMany({
    take,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor
      }
    }),
    where: {
      ...(name && nameCriteria),
      ...(role && roleCriteria)
    }
  })

  if (result.length === 0) {
    return { data: result, pagination: { hasNextPage: false } }
  }

  const lastUser = result[result.length - 1]
  const cursor = lastUser.id

  const nextPage = await prisma.user.findMany({
    take,
    skip: 1,
    cursor: {
      id: cursor
    },
    where: {
      ...(name && nameCriteria),
      ...(role && roleCriteria)
    }
  })

  return {
    data: result,
    pagination: { hasNextPage: nextPage.length > 0, lastCursor: cursor }
  }
}

export { getUsers }
