import { useEffect, useState } from 'react'

import { API_HOST } from '../../lib/constants'
import { Role } from '../../lib/enums'
import { PaginatedResponse } from '../../lib/types'
import User from '../../models/user'

interface UseGetUsersQueryProps {
  query?: {
    name?: string
    role?: Role
  }
  pagination: {
    lastCursor?: number
    perPage: number
  }
}

const useGetUsersQuery = (props: UseGetUsersQueryProps) => {
  const { query, pagination } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [data, setData] = useState<PaginatedResponse<User>>()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const searchParams = new URLSearchParams()

      if (query && Object.keys(query).length) {
        for (const [key, value] of Object.entries(query)) {
          if (!value) continue

          searchParams.set(key, value)
        }
      }

      if (pagination.lastCursor) {
        searchParams.set('lastCursor', pagination.lastCursor.toString())
      }

      searchParams.set('perPage', pagination.perPage.toString())

      try {
        const response = await fetch(
          `${API_HOST}/users?${searchParams.toString()}`
        )

        if (!response.ok) {
          setError(new Error(response.statusText))
          setData(undefined)
          return
        }

        const responseData: PaginatedResponse<User> = await response.json()

        setData(responseData)
        setError(undefined)
      } catch (err: any) {
        console.error(err)
        setError(err)
        setData(undefined)
      } finally {
        setLoading(false)
      }
    })()
  }, [pagination.lastCursor, pagination.perPage, query])

  return { loading, error, data }
}

export default useGetUsersQuery
