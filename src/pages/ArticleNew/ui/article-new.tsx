import { Form } from '@/shared/ui/Form'
import { Input } from '@/shared/ui/Input'
import { useForm } from 'react-hook-form'
import { FormArticle } from '../model/types'
import { useCreateArticleMutation } from '@/entities/artciles/api'
import { Button } from '@/shared/ui/Button'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TagsField } from '@/shared/ui/TagsField'
import css from './article-new.module.scss'

export function ArticleNew() {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<FormArticle>({ mode: 'onBlur', defaultValues: { tagList: [] } })

  const [createArticle, { isLoading }] = useCreateArticleMutation()
  const navigate = useNavigate()

  useEffect(() => {
    setFocus('title')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormArticle> = async data => {
    await createArticle(data)
    navigate('/')
  }

  return (
    <Form
      className={css.form}
      width={940}
      title='Create new article'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className={css.form__group}
        {...register('title', {
          required: 'is required'
        })}
        isLoading={isLoading}
        id='title'
        label='Title'
        error={errors.title}
      />

      <Input
        className={css.form__group}
        {...register('description', {
          required: 'is required'
        })}
        isLoading={isLoading}
        id='description'
        label='Short description'
        error={errors.description}
      />

      <Input
        className={css.form__group}
        {...register('body', {
          required: 'is required'
        })}
        isTextarea
        isLoading={isLoading}
        id='body'
        label='Text'
        error={errors.body}
      />

      <TagsField className={css.form__group} control={control} isLoading={isLoading} />

      <Button className={css.form__button} type='submit' theme='filled' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Send'}
      </Button>
    </Form>
  )
}
