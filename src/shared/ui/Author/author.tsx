import { formatDate } from '@/shared/utils/formatDate'
import css from './author.module.scss'

type Props = {
  avatar: string
  username: string
  createdAt: string
}

export function Author({ avatar, username, createdAt }: Props) {
  return (
    <div className={css.user}>
      <img className={css.user__avatar} src={avatar} alt='avatar' />
      <h3 className={css.user__name}>{username}</h3>
      <time className={css.user__date} dateTime={createdAt}>
        {formatDate(createdAt)}
      </time>
    </div>
  )
}
