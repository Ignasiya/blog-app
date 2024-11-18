import { ForwardedRef, forwardRef } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { ShowIcon } from '../Icons'
import classNames from 'classnames'
import css from './input.module.scss'

type Props = {
  className?: string
  id: string
  type?: string
  label: string
  isTextarea?: boolean
  error: FieldError | undefined
  isLoading?: boolean
  showPassword?: boolean
  onClick?: () => void
  defaultValue?: string
} & UseFormRegisterReturn

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      className,
      isTextarea = false,
      id,
      type = 'text',
      label,
      error,
      isLoading,
      showPassword,
      onClick,
      defaultValue,
      ...registerProps
    },
    ref
  ) => {
    return (
      <section className={classNames(css.group, className)}>
        {isTextarea ? (
          <textarea
            className={classNames(css.input, css.input_textarea)}
            id={id}
            placeholder={label}
            aria-invalid={!!error}
            disabled={isLoading}
            {...registerProps}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            defaultValue={defaultValue}
          />
        ) : (
          <input
            className={classNames(css.input, { [css.input_password]: showPassword })}
            id={id}
            type={type}
            placeholder={label}
            aria-invalid={!!error}
            disabled={isLoading}
            {...registerProps}
            ref={ref as ForwardedRef<HTMLInputElement>}
            defaultValue={defaultValue}
          />
        )}
        <label className={css.label} htmlFor={id}>
          {label}
        </label>

        {showPassword !== undefined && (
          <button
            type='button'
            onClick={onClick}
            className={css.toggle}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <ShowIcon show={showPassword} />
          </button>
        )}

        {error && (
          <div role='alert' className={css.error}>
            {error?.message}
          </div>
        )}
      </section>
    )
  }
)

Input.displayName = 'Input'

export { Input }
