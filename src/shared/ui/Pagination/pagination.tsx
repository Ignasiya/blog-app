import classNames from 'classnames'
import css from './pagination.module.scss'
import { ArrowLeftIcon, ArrowRightIcon } from '../Icons'
import { getPaginationPages } from '@/shared/utils/getPaginationPages'

type Props = {
  className?: string
  currentPage: number
  totalItems: number
  onSetPage: (page: number) => void
}

export function Pagination({ className, currentPage, totalItems, onSetPage }: Props) {
  const lastPage = totalItems > 0 ? Math.ceil(totalItems / 20) : 1

  const pages = getPaginationPages(currentPage, lastPage)

  return (
    <nav className={className} aria-label='Pagination'>
      <ul className={css.pagination}>
        <li>
          <button
            className={css.pagination__button}
            onClick={() => onSetPage(currentPage - 1)}
            type='button'
            aria-label='Previous page'
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon width={12} height={12} />
          </button>
        </li>

        {pages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span>{page}</span>
            ) : (
              typeof page === 'number' && (
                <button
                  type='button'
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={classNames(css.pagination__button, {
                    [css.active]: page === currentPage
                  })}
                  onClick={() => onSetPage(page)}
                  disabled={page === currentPage}
                >
                  {page}
                </button>
              )
            )}
          </li>
        ))}

        <li>
          <button
            className={css.pagination__button}
            onClick={() => onSetPage(currentPage + 1)}
            type='button'
            aria-label='Next page'
            disabled={currentPage === lastPage}
          >
            <ArrowRightIcon width={12} height={12} />
          </button>
        </li>
      </ul>
    </nav>
  )
}
