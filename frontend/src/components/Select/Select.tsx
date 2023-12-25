import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

const Select = (props: SelectProps) => {
  const { className = '', label, ...rest } = props

  if (label) {
    return (
      <label className='form-control w-full max-w-xs'>
        <div className='label-text'>{label}</div>
        <select
          className={`select select-bordered w-full ${className}`}
          {...rest}
        />
      </label>
    )
  }

  return (
    <select
      className={`select select-bordered w-full max-w-xs ${className}`}
      {...rest}
    />
  )
}

export default Select
