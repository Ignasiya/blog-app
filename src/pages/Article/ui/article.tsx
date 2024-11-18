import { useGetArticleQuery } from '@/entities/artciles/api'
import { ArticleDetails } from '@/entities/artciles'
import { NotFound } from '@/pages/NotFound'
import { Spinner } from '@/shared/ui/Spinner'
import { useParams } from 'react-router-dom'

export function Article() {
  const { slug } = useParams<{ slug: string }>()

  const { isLoading, data: article, error, isError } = useGetArticleQuery(slug ?? '')

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    if ('originalStatus' in error) {
      return <NotFound error={{ status: error.originalStatus, statusText: error.data }} />
    }

    return <NotFound error={{ status: 500, statusText: 'Internal Server Error' }} />
  }

  return article && <ArticleDetails article={article.article} />
}
