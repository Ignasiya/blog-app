import { useGetArticlesQuery } from '@/entities/artciles/api'
import { ArticleList } from '@/entities/artciles'
import { Spinner } from '@/shared/ui/Spinner'
import { useSearchParams } from 'react-router-dom'
import { Article } from '@/entities/artciles/model/types'
import { Pagination } from '@/shared/ui/Pagination'
import css from './articles.module.scss'

export function Articles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page: number = parseInt(searchParams.get('page') || '1', 10)

  const { isLoading, data } = useGetArticlesQuery((page - 1) * 20)

  const articles: Article[] = data?.articles || []
  const articlesCount: number = data?.articlesCount || 0

  const handleSetPage = (page: number) => {
    setSearchParams({ page: page.toString() })
    requestAnimationFrame(() => {
      const contentElement = document.querySelector('#contentPage')
      if (contentElement) {
        contentElement.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  return articles ? (
    <>
      <ArticleList articles={articles} />
      <Pagination
        className={css.pagination}
        currentPage={page}
        totalItems={articlesCount}
        onSetPage={handleSetPage}
      />
    </>
  ) : (
    <div>
      <h1 className={css.message}>No articles</h1>
    </div>
  )
}
