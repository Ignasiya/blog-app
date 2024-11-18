import { HeartIcon } from '@/shared/ui/Icons'
import { Article } from '../../model/types'
import { formatFavoritesCount } from '@/shared/utils/formatFavoritesCount'
import { normalizeText } from '@/shared/utils/normalizeText'
import { TagList } from '@/shared/ui/TagsList'
import { Author } from '@/shared/ui/Author'
import classNames from 'classnames'
import Markdown from 'markdown-to-jsx'
import { formatDate } from '@/shared/utils/formatDate'
import { Button } from '@/shared/ui/Button'
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation
} from '../../api'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '@/entities/user/api'
import { PopupConfirm } from '@/widgets/PopupConfirm'
import { useRef, useState } from 'react'
import css from './article-item.module.scss'

type Props = {
  article: Article
}

export function ArticleDetails({ article }: Props) {
  const {
    slug,
    title,
    favorited,
    favoritesCount,
    tagList,
    author,
    description,
    createdAt,
    updatedAt,
    body
  } = article

  const { isAuthenticated } = useAuth()
  const [openPopup, setOpenPopup] = useState(false)
  const buttonDelete = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [favoriteArticle, { isLoading: isLoadingFavorite }] = useFavoriteArticleMutation()
  const [unfavoriteArticle, { isLoading: isLoadingUnfavorite }] = useUnfavoriteArticleMutation()
  const [deleteArticle, { isLoading: isLoadingDelete }] = useDeleteArticleMutation()
  const { data: user } = useGetUserQuery()

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/sign-in', { state: { from: location }, replace: true })
      return
    }

    try {
      if (favorited) {
        await unfavoriteArticle(slug).unwrap()
      } else {
        await favoriteArticle(slug).unwrap()
      }
    } catch (error) {
      console.error('Error updating favorite status:', error)
    }
  }

  const handleDelete = () => {
    setOpenPopup(false)
    navigate('/')
    deleteArticle(slug)
  }

  return (
    <article className={classNames(css.article, css.article_details)}>
      <header className={css.article__header}>
        <section className={css.article__content}>
          <h2 className={css.article__title}>{normalizeText(title)}</h2>

          <button
            className={classNames(css.likes, css.likes__btn)}
            onClick={handleFavorite}
            disabled={isLoadingFavorite || isLoadingUnfavorite}
          >
            <HeartIcon liked={favorited} width={22} height={22} />

            <span className={css.likes__count}>{formatFavoritesCount(favoritesCount)}</span>
          </button>

          {tagList && <TagList className={css.article__tags} tags={tagList} />}

          <p className={css.article__description}>{normalizeText(description)}</p>
        </section>

        <section className={css.article__interface}>
          <Author avatar={author.image} username={author.username} createdAt={createdAt} />

          {isAuthenticated && author.username === user?.user.username && (
            <nav className={css.article__actions}>
              <div className={css.article__popup}>
                <Button
                  ref={buttonDelete}
                  theme='outline'
                  color='red'
                  onClick={() => setOpenPopup(open => !open)}
                >
                  Delete
                </Button>
                <PopupConfirm isOpen={openPopup} anchorRef={buttonDelete}>
                  <span className={css.popup__text}>Are you sure to delete this article?</span>
                  <div className={css.popup}>
                    <Button
                      className={css.popup__btn}
                      theme='outline'
                      color='gray'
                      onClick={() => setOpenPopup(false)}
                      disabled={isLoadingDelete}
                    >
                      No
                    </Button>

                    <Button
                      className={css.popup__btn}
                      theme='filled'
                      onClick={handleDelete}
                      disabled={isLoadingDelete}
                    >
                      Yes
                    </Button>
                  </div>
                </PopupConfirm>
              </div>

              <Button
                theme='outline'
                color='green'
                onClick={() => navigate(`/articles/${slug}/edit`)}
              >
                Edit
              </Button>
            </nav>
          )}
        </section>
      </header>
      <section className={css.article__body}>
        <time className={css.article__date} dateTime={updatedAt}>
          Updated: {formatDate(updatedAt)}
        </time>
        {body && <Markdown>{normalizeText(body)}</Markdown>}
      </section>
    </article>
  )
}
