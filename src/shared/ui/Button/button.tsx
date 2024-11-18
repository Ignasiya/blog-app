import React from 'react'
import classNames from 'classnames'
import css from './button.module.scss'

export type ButtonProps = {
  children?: string | React.ReactNode
  type?: 'button' | 'submit'
  theme?: 'filled' | 'outline'
  color?: 'blue' | 'red' | 'green' | 'gray'
  className?: string
  disabled?: boolean
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  onClick?: () => void
  ref?: React.Ref<HTMLButtonElement>
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, Icon, type = 'button', theme, color, className, disabled, onClick } = props
  return (
    <button
      type={type}
      data-theme={theme}
      data-color={color}
      className={classNames(css.button, className, {
        [css['button--icon']]: Icon
      })}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
    >
      {Icon && <Icon width={24} height={24} />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
