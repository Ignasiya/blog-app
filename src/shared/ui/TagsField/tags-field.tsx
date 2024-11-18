import { Controller, useFieldArray } from 'react-hook-form'
import { Button } from '../Button'
import type { Control } from 'react-hook-form'
import { FormArticle } from '@/pages/ArticleNew/model/types'
import classNames from 'classnames'
import css from './tags-field.module.scss'

type Props = {
  className?: string
  control: Control<FormArticle>
  isLoading: boolean
}

export function TagsField({ className, control, isLoading }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-expect-error: не пойму в чем беда
    name: 'tagList'
  })

  return (
    <section className={classNames(css.tags, className)}>
      <h2 className={css.tags__title}>Tags</h2>

      <ul className={css.tags__list}>
        {fields.map((tag, index) => (
          <li key={index} className={css.tags__item}>
            <Controller
              control={control}
              name={`tagList.${index}`}
              render={({ field }) => (
                <input
                  {...field}
                  className={css.input}
                  type='text'
                  placeholder='Tag'
                  disabled={isLoading}
                />
              )}
            />
            {index === fields.length - 1 && (
              <Button
                className={css.tags__button}
                type='button'
                theme='outline'
                color='red'
                onClick={() => {
                  remove(index)
                }}
              >
                Delete
              </Button>
            )}
          </li>
        ))}
        {fields.length === 0 && <li className={css.tags__item}>No tags</li>}
      </ul>

      <Button
        className={classNames(css.tags__button, css.tags__button_add)}
        type='button'
        theme='outline'
        color='blue'
        onClick={() => append('')}
      >
        Add tag
      </Button>
    </section>
  )
}
