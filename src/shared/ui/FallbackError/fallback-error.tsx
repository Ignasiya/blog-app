import { Button } from '@/shared/ui/Button'
import css from './fallback-error.module.scss'

type FallbackErrorProps = {
  resetErrorBoundary: () => void
}

export function FallbackError({ resetErrorBoundary }: FallbackErrorProps) {
  return (
    <div className={css.error_container} role='alert'>
      <h1 className={css.error_title}>Something went wrong</h1>
      <div className={css.error_message}>
        Sorry, an unexpected error occurred while loading the page.
      </div>
      <Button theme='filled' onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </div>
  )
}
