import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button } from '@/shared/ui/Button'
import { CloseIcon } from '@/shared/ui/Icons'
import css from './modal-menu.module.scss'

type Props = {
  children: React.ReactNode
} & React.DialogHTMLAttributes<HTMLDialogElement>

export const ModalMenu = forwardRef<HTMLDialogElement, Props>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => dialogRef.current!)

  const closeModal = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog aria-label='Меню' ref={dialogRef} className={css.modal}>
      <Button className={css.close} onClick={closeModal} Icon={() => <CloseIcon />} />
      <main className={css.content}>{children}</main>
    </dialog>
  )
})

ModalMenu.displayName = 'ModalMenu'
