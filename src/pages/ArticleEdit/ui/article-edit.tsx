import { Form } from '@/shared/ui/Form'
import { Input } from '@/shared/ui/Input'
import { useForm } from 'react-hook-form'
import { useGetArticleQuery, useUpdateArticleMutation } from '@/entities/artciles/api'
import { Button } from '@/shared/ui/Button'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { TagsField } from '@/shared/ui/TagsField'
import { FormArticle } from '@/pages/ArticleNew/model/types'
import { Spinner } from '@/shared/ui/Spinner'
import { NotFound } from '@/pages/NotFound'
import { useGetUserQuery } from '@/entities/user/api'
import css from './article-edit.module.scss'

export function ArticleEdit() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string | undefined }>()
  const { isLoading: isLoadingArticle, data: article, error } = useGetArticleQuery(slug ?? '')
  const [updateArticle, { isLoading }] = useUpdateArticleMutation()
  const { data: user } = useGetUserQuery()
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors }
  } = useForm<FormArticle>({ mode: 'onBlur', defaultValues: { tagList: [] } })

  useEffect(() => {
    setFocus('title')
  }, [setFocus])

  useEffect(() => {
    if (article?.article) {
      const { title, description, body, tagList } = article.article

      setValue('title', title)
      setValue('description', description)
      setValue('body', body || '')
      setValue('tagList', tagList || [])
    }
  }, [article, setValue])

  const onSubmit: SubmitHandler<FormArticle> = async data => {
    await updateArticle({ slug: slug ?? '', data })
    navigate('/articles/' + slug)
  }

  if (user?.user.username !== article?.article.author.username) {
    return <NotFound error={{ status: 403, statusText: 'Forbidden' }} />
  }

  if (isLoadingArticle) {
    return <Spinner />
  }

  if (error) {
    if ('originalStatus' in error) {
      return <NotFound error={{ status: error.originalStatus, statusText: error.data }} />
    }

    return <NotFound error={{ status: 500, statusText: 'Internal Server Error' }} />
  }

  return (
    <Form className={css.form} width={940} title='Edit article' onSubmit={handleSubmit(onSubmit)}>
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
        {isLoading ? 'Loading...' : 'Update'}
      </Button>
    </Form>
  )
}
