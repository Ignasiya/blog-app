import { HeartIcon } from '@/shared/ui/Icons'
import { Article } from '../../model/types'
import { formatFavoritesCount } from '@/shared/utils/formatFavoritesCount'
import { normalizeText } from '@/shared/utils/normalizeText'
import { TagList } from '@/shared/ui/TagsList'
import { Author } from '@/shared/ui/Author'
import classNames from 'classnames'
import css from './article-item.module.scss'

type Props = {
  article: Article
}

export function ArticleItem({ article }: Props) {
  const { title, favorited, favoritesCount, tagList, author, description, createdAt } = article
  return (
    <article className={css.article}>
      <header className={css.article__header}>
        <section className={css.article__content}>
          <h2 className={css.article__title}>{normalizeText(title)}</h2>

          <div className={css.likes}>
            <HeartIcon liked={favorited} width={22} height={22} />

            <span className={css.likes__count}>{formatFavoritesCount(favoritesCount)}</span>
          </div>

          {tagList && <TagList className={css.article__tags} tags={tagList} />}
        </section>

        <Author avatar={author.image} username={author.username} createdAt={createdAt} />
      </header>
      <section className={css.article__body}>
        <p className={classNames(css.article__description, css.article__description_short)}>
          {normalizeText(description)}
        </p>
      </section>
    </article>
  )
}
