import { Link } from 'react-router-dom'
import classNames from 'classnames'
import css from './not-found.module.scss'

type RejectedData = {
  error?: {
    status: number
    statusText: string
  }
}

export function NotFound({ error }: RejectedData) {
  return (
    <div className={css.container}>
      <h1 className={css.title}>{error?.status || 404}</h1>
      <p className={css.message}>
        {error?.statusText || "Oops! The page you're looking for doesn't exist."}
      </p>
      <Link to='/' className={css.button}>
        Go Back Home
      </Link>
      <div className={css.animation}>
        <div className={classNames(css.circle, css.small)}></div>
        <div className={classNames(css.circle, css.medium)}></div>
        <div className={classNames(css.circle, css.large)}></div>
      </div>
    </div>
  )
}
