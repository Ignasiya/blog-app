import { Form } from '@/shared/ui/Form'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/entities/user/api'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import type { SubmitHandler } from 'react-hook-form'
import { Button } from '@/shared/ui/Button'
import { Link } from 'react-router-dom'
import { FormLogin } from '../model/types'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import css from './sign-in.module.scss'

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const [login, { isLoading }] = useLoginMutation()

  const { handleLogin } = useAuth()

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors }
  } = useForm<FormLogin>({ mode: 'onBlur' })

  useEffect(() => {
    setFocus('email')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormLogin> = async data => {
    try {
      const { user } = await login(data).unwrap()
      handleLogin(user.token)
    } catch (error) {
      if (error && 'data' in (error as FetchBaseQueryError)) {
        const typedError = error as FetchBaseQueryError
        const errors = (typedError.data as { errors: { ['email or password']: string } }).errors

        if (errors) {
          const value = errors['email or password']
          setError('email', { message: value })
          setError('password', { message: value })
        }
      }
    }
  }

  return (
    <Form title='Sign In' width={384} onSubmit={handleSubmit(onSubmit)}>
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
      />

      <Input
        className={css.form__group}
        {...register('password', {
          required: 'is required',
          minLength: { value: 6, message: 'must be at least 6 characters' },
          maxLength: { value: 40, message: 'must be at most 40 characters' },
          pattern: {
            value: /^.(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
            message: 'must contain at least one letter, one number, and one special character'
          }
        })}
        id='password'
        type={showPassword ? 'text' : 'password'}
        label='Password'
        error={errors.password}
        showPassword={showPassword}
        onClick={() => setShowPassword(!showPassword)}
      />

      <Button className={css.form__button} type='submit' theme='filled' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>

      <p className={css.form__text}>
        Don’t have an account?&nbsp;
        <Link className={css.form__link} to={'/sign-up'}>
          Sign Up
        </Link>
        .
      </p>
    </Form>
  )
}
