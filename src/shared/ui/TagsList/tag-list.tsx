import { v4 as uuidv4 } from 'uuid'
import { normalizeText } from '@/shared/utils/normalizeText'
import classNames from 'classnames'
import css from './tag-list.module.scss'

type Props = {
  className?: string
  tags: string[]
}

export function TagList({ className, tags }: Props) {
  return (
    <div className={classNames(css.tags, className)}>
      {tags.map(
        tag =>
          tag.trim() && (
            <span className={css.tag} key={uuidv4()}>
              {normalizeText(tag)}
            </span>
          )
      )}
    </div>
  )
}
