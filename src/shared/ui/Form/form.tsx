import React from 'react'
import css from './form.module.scss'
import classNames from 'classnames'

type Props = {
  className?: string
  title: string
  width?: number
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

export function Form({ className, title, width, onSubmit, children }: Props) {
  return (
    <div className={classNames(css.form__wrapper, className)}>
      <form
        className={css.form}
        style={width ? { maxWidth: width + 'px' } : undefined}
        onSubmit={onSubmit}
      >
        <fieldset className={css.form__fieldset}>
          <legend className={css.form__legend}>{title}</legend>

          {children}
        </fieldset>
      </form>
    </div>
  )
}
