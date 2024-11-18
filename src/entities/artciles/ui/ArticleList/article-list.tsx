import { Link } from 'react-router-dom'
import { Article } from '../../model/types'
import { ArticleItem } from '../ArticleItem/article-item'
import css from './article-list.module.scss'

type Props = {
  articles: Article[]
}

export function ArticleList({ articles }: Props) {
  return (
    <ul className={css.list}>
      {articles.map(article => (
        <li key={article.slug}>
          <Link to={article.slug} className={css.list__item}>
            <ArticleItem article={article} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
