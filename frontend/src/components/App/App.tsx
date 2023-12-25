import { Role } from '../../lib/enums'
import ButtonBase from '../Buttons/ButtonBase'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import Select from '../Select'
import TextField from '../TextField'

const App = () => {
  return (
    <div className='py-8 w-3/5 mx-auto'>
      <div>
        <form className='flex items-end gap-4 w-full'>
          <TextField label='Name' placeholder='Name' />
          <Select label='Role'>
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
    </div>
  )
}

export default App
