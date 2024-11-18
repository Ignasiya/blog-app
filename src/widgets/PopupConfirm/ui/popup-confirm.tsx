import React, { useCallback, useEffect, useRef, useState } from 'react'
import css from './popup-confirm.module.scss'
import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  anchorRef: React.RefObject<HTMLDivElement>
}

export function PopupConfirm({ children, isOpen, position, anchorRef }: Props) {
  const [popupPosition, setPopupPosition] = useState(position || 'right')
  const popupRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(() => {
    if (!anchorRef.current || !popupRef.current) return

    const anchorRect = anchorRef.current.getBoundingClientRect()
    const popupRect = popupRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (position) {
      setPopupPosition(position)
    } else {
      if (anchorRect.right + popupRect.width > viewportWidth && anchorRect.left > popupRect.width) {
        setPopupPosition('left')
      } else if (
        anchorRect.bottom + popupRect.height > viewportHeight &&
        anchorRect.top > popupRect.height
      ) {
        setPopupPosition('top')
      } else if (anchorRect.right + popupRect.width <= viewportWidth) {
        setPopupPosition('right')
      } else {
        setPopupPosition('bottom')
      }
    }
  }, [anchorRef, position])

  useEffect(() => {
    if (isOpen) {
      updatePosition()
      window.addEventListener('resize', updatePosition)
    }
    return () => window.removeEventListener('resize', updatePosition)
  }, [isOpen, updatePosition])

  return (
    isOpen && (
      <div
        className={classNames(css.popup_container, css[`popup_${popupPosition}`])}
        ref={popupRef}
      >
        <div className={css.popup_content}>{children}</div>
      </div>
    )
  )
}
