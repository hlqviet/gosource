import { ChangeEventHandler, FormEventHandler, useState } from 'react'

import useGetUsersQuery from '../../hooks/useGetUsersQuery'
import { PER_PAGE } from '../../lib/constants'
import { Role } from '../../lib/enums'
import ButtonBase from '../Buttons/ButtonBase'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import Select from '../Select'
import TextField from '../TextField'
import UserTable from '../UserTable'

const App = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(PER_PAGE)
  const [cursorHistory, setCursorHistory] = useState<number[]>([])
  const [queryParams, setQueryParams] = useState<
    Parameters<typeof useGetUsersQuery>[0]
  >({
    pagination: {
      perPage: itemsPerPage
    }
  })
  const { data, error, loading } = useGetUsersQuery(queryParams)

  const handleReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    setName('')
    setRole('')
    setQueryParams({
      pagination: {
        perPage: itemsPerPage
      }
    })
    setCursorHistory([])
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    setQueryParams({
      query: {
        name,
        role: role as Role
      },
      pagination: {
        perPage: itemsPerPage,
        lastCursor: undefined
      }
    })
    setCursorHistory([])
  }

  const handlePerPageChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const perPage = parseInt(event.target.value, 10)

    setItemsPerPage(perPage)
    setQueryParams((prevState) => ({
      ...prevState,
      pagination: {
        lastCursor: undefined,
        perPage
      }
    }))
    setCursorHistory([])
  }

  const handlePreviousClick = () => {
    setQueryParams((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        lastCursor: cursorHistory[cursorHistory.length - 2]
      }
    }))

    setCursorHistory((prevState) => prevState.slice(0, -1))
  }

  const handleNextClick = () => {
    const lastCursor = data?.pagination.lastCursor

    setQueryParams((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        lastCursor
      }
    }))

    if (lastCursor !== undefined) {
      setCursorHistory((prevState) => [...prevState, lastCursor])
    }
  }

  if (error) return <div>{error.message}</div>

  return (
    <div className='py-8 w-3/5 mx-auto flex flex-wrap gap-4'>
      <div className='w-full'>
        <form
          className='flex items-end gap-4 w-full'
          onReset={handleReset}
          onSubmit={handleSubmit}
        >
          <TextField
            label='Name'
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Select
            label='Role'
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value=''>All</option>
            {Object.values(Role).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
          <ButtonPrimary type='submit'>Submit</ButtonPrimary>
          <ButtonBase type='reset'>Reset</ButtonBase>
        </form>
      </div>

      {data?.data && (
        <div className='w-full flex justify-between items-end'>
          <Select
            className='max-w-24'
            label='Items per page'
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            <option value={PER_PAGE}>{PER_PAGE}</option>
            {[20, 25, 30, 100].map((perPage) => (
              <option key={perPage} value={perPage}>
                {perPage}
              </option>
            ))}
          </Select>
          <div className='w-full flex justify-end gap-2'>
            <ButtonBase
              disabled={loading || !cursorHistory.length}
              onClick={handlePreviousClick}
            >
              Previous
            </ButtonBase>
            <ButtonBase
              disabled={loading || !data.pagination.hasNextPage}
              onClick={handleNextClick}
            >
              Next
            </ButtonBase>
          </div>
        </div>
      )}

      {loading && <div className='loading loading-spinner' />}

      {!loading && data?.data.length && (
        <div className='w-full h-[calc(100vh-15rem)] overflow-y-auto'>
          <UserTable users={data.data} />
        </div>
      )}
    </div>
  )
}

export default App
