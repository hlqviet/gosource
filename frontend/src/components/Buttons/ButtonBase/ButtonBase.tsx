import { ButtonHTMLAttributes } from 'react'

const ButtonBase = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = '', ...rest } = props

  return <button className={`btn ${className}`} {...rest} />
}

export default ButtonBase
