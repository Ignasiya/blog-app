import { useGetUserQuery, useUpdateUserMutation } from '@/entities/user/api'
import { Button } from '@/shared/ui/Button'
import { Form } from '@/shared/ui/Form'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { FormUpdateUser, FormUpdateUserError } from '../model/types'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import css from './profile.module.scss'

export function Profile() {
  const { data: user } = useGetUserQuery()
  const [showPassword, setShowPassword] = useState(false)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors }
  } = useForm<FormUpdateUser>({ mode: 'onBlur' })

  useEffect(() => {
    setFocus('username')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormUpdateUser> = async data => {
    try {
      if (!data.password) {
        delete data.password
      }

      await updateUser(data).unwrap()
    } catch (error) {
      if (error && 'data' in (error as FetchBaseQueryError)) {
        const typedError = error as FetchBaseQueryError
        const errors = (typedError.data as { errors: FormUpdateUserError }).errors

        if (errors) {
          for (const [key, value] of Object.entries(errors)) {
            setError(key as keyof FormUpdateUserError, { message: value })
          }
        }
      }
    }
  }

  return (
    <Form title='Edit Profile' width={384} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={css.form__group}
        {...register('username', {
          required: 'is required',
          minLength: { value: 3, message: 'must be at least 3 characters' },
          maxLength: { value: 20, message: 'must be at most 20 characters' },
          pattern: { value: /^[A-Za-z0-9_-]+$/, message: 'letters and only "-" and "_"' }
        })}
        isLoading={isLoading}
        id='username'
        type='text'
        label='Username'
        error={errors.username}
        defaultValue={user?.user.username}
      />

      <Input
        className={css.form__group}
        {...register('email', {
          required: 'is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
            message: 'invalid email address'
          }
        })}
        isLoading={isLoading}
        id='email'
        type='email'
        label='Email address'
        error={errors.email}
        defaultValue={user?.user.email}
      />

      <Input
        className={css.form__group}
        {...register('password', {
          minLength: { value: 6, message: 'must be at least 6 characters' },
          maxLength: { value: 40, message: 'must be at most 40 characters' },
          pattern: {
            value: /^.(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
            message: 'must contain at least one letter, one number, and one special character'
          }
        })}
        id='password'
        type={showPassword ? 'text' : 'password'}
        label='New password'
        error={errors.password}
        showPassword={showPassword}
        onClick={() => setShowPassword(!showPassword)}
      />

      <Input
        className={css.form__group}
        {...register('image', {
          required: 'is required',
          pattern: {
            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
            message: 'Avatar image must be a valid URL'
          }
        })}
        isLoading={isLoading}
        id='avatar'
        type='text'
        label='Avatar image (url)'
        error={errors.image}
        defaultValue={user?.user.image || ''}
      />

      <Button className={css.form__button} type='submit' theme='filled' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Save'}
      </Button>
    </Form>
  )
}
