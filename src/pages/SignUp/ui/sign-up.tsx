import { Button } from '@/shared/ui/Button'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form } from '@/shared/ui/Form'
import { useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/Input'
import { useRegisterNewUserMutation } from '@/entities/user/api'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import type { SubmitHandler } from 'react-hook-form'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { FormError, FormRegistration } from '../model/types'
import css from './sign-up.module.scss'
import classNames from 'classnames'

export function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setError,
    formState: { errors }
  } = useForm<FormRegistration>({ mode: 'onBlur', defaultValues: { terms: true } })

  const [registerNewUser, { isLoading }] = useRegisterNewUserMutation()

  const [showPassword, setShowPassword] = useState(false)

  const { handleLogin } = useAuth()

  useEffect(() => {
    setFocus('username')
  }, [setFocus])

  const onSubmit: SubmitHandler<FormRegistration> = async data => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }

    try {
      const { user } = await registerNewUser(data).unwrap()
      handleLogin(user.token)
    } catch (error) {
      if (error && 'data' in (error as FetchBaseQueryError)) {
        const typedError = error as FetchBaseQueryError
        const errors = (typedError.data as { errors: FormError }).errors

        if (errors) {
          for (const [key, value] of Object.entries(errors)) {
            setError(key as keyof FormError, { message: value })
          }
        }
      }
    }
  }

  const password = watch('password')

  return (
    <Form title='Create new account' width={384} onSubmit={handleSubmit(onSubmit)}>
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
        label='Email'
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

      <Input
        className={css.form__group}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
        id='confirmPassword'
        type={showPassword ? 'text' : 'password'}
        label='Confirm password'
        error={errors.confirmPassword}
      />

      <hr className={css.form__divider} />

      <label className={css.form__terms}>
        <input
          className={css.form__checkbox}
          type='checkbox'
          {...register('terms', { required: 'You must agree to the terms' })}
          disabled={isLoading}
        />
        <span
          className={classNames(
            css.form__checkbox_icon,
            errors.terms && css.form__checkbox_invalid
          )}
        ></span>
        <span>
          I agree to the processing of my personal information
          {errors.terms && (
            <div role='alert' className={css.form__error}>
              {errors.terms.message}
            </div>
          )}
        </span>
      </label>

      <Button className={css.form__button} type='submit' theme='filled' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Create'}
      </Button>

      <p className={css.form__text}>
        Already have an account?&nbsp;
        <Link className={css.form__link} to={'/sign-in'}>
          Sign In
        </Link>
        .
      </p>
    </Form>
  )
}
