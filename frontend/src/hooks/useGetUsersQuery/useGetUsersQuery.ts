import { useEffect, useState } from 'react'

import { API_HOST, PER_PAGE } from '../../lib/constants'
import { Role } from '../../lib/enums'
import { PaginatedResponse } from '../../lib/types'
import User from '../../models/user'

interface UseGetUsersQueryProps {
  name?: string
  role?: Role
  lastCursor?: number
}

const useGetUsersQuery = (props: UseGetUsersQueryProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [data, setData] = useState<PaginatedResponse<User>>()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const searchParams = new URLSearchParams()

      if (Object.keys(props).length) {
        for (const [key, value] of Object.entries(props)) {
          if (!value) continue

          searchParams.set(key, value)
        }
      }

      searchParams.set('perPage', PER_PAGE.toString())

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
  }, [props])

  return { loading, error, data }
}

export default useGetUsersQuery
