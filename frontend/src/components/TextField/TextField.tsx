import { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const TextField = (props: TextFieldProps) => {
  const { className = '', label, ...rest } = props

  if (label) {
    return (
      <label className='form-control w-full max-w-xs'>
        <div className='label-text'>{label}</div>
        <input
          className={`input input-bordered w-full ${className}`}
          type='text'
          {...rest}
        />
      </label>
    )
  }

  return (
    <input
      className={`input input-bordered w-full max-w-xs ${className}`}
      type='text'
      {...rest}
    />
  )
}

export default TextField
