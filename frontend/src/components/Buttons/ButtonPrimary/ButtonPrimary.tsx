import { ButtonHTMLAttributes } from 'react'

import ButtonBase from '../ButtonBase'

const ButtonPrimary = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = '', ...rest } = props

  return <ButtonBase className={`btn-primary ${className}`} {...rest} />
}

export default ButtonPrimary
