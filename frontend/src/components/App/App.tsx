import { FormEventHandler, useState } from 'react'

import useGetUsersQuery from '../../hooks/useGetUsersQuery'
import { Role } from '../../lib/enums'
import ButtonBase from '../Buttons/ButtonBase'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import Select from '../Select'
import TextField from '../TextField'
import UserTable from '../UserTable'

const App = () => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [cursorHistory, setCursorHistory] = useState<number[]>([])
  const [queryParams, setQueryParams] = useState<
    Parameters<typeof useGetUsersQuery>[0]
  >({})
  const { data, error, loading } = useGetUsersQuery(queryParams)

  const handleReset: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    setName('')
    setRole('')
    setQueryParams({})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    setQueryParams({
      lastCursor: undefined,
      name,
      role: role as Role
    })
  }

  const handlePreviousClick = () => {
    setQueryParams((prevState) => ({
      ...prevState,
      lastCursor: cursorHistory[cursorHistory.length - 2]
    }))

    setCursorHistory((prevState) => prevState.slice(0, -1))
  }

  const handleNextClick = () => {
    const lastCursor = data?.pagination.lastCursor

    setQueryParams((prevState) => ({
      ...prevState,
      lastCursor
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

      {loading && <div className='loading loading-spinner' />}

      {!loading && data?.data.length && (
        <div className='w-full'>
          <UserTable users={data?.data} />
        </div>
      )}

      {data?.data.length && (
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
      )}
    </div>
  )
}

export default App
