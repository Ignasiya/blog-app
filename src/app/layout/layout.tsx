import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { BurgerIcon } from '@/shared/ui/Icons'
import React, { useRef } from 'react'
import { ModalMenu } from '@/widgets/ModalMenu'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import css from './layout.module.scss'
import { useGetUserQuery } from '@/entities/user/api'

type Props = {
  children?: React.ReactNode
}

export function Layout({ children }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const { isAuthenticated, handleLogout } = useAuth()
  const { data, isError, isLoading } = useGetUserQuery(undefined, { skip: !isAuthenticated })

  if (isError) {
    handleLogout()
  }

  const user = data?.user

  const openModal = () => {
    if (modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal()
    }
  }

  const panel = isAuthenticated ? (
    <>
      <Button
        className={css.header__btn_small}
        theme='outline'
        color='green'
        onClick={() => navigate('/new-article')}
      >
        Create article
      </Button>

      {isLoading ? (
        <div className={css.spinner}></div>
      ) : (
        <Link to='/profile' className={css.user}>
          <h2 className={css.user__name}>{user?.username}</h2>
          <img
            className={css.user__avatar}
            src={
              user?.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }
            alt='avatar'
          />
        </Link>
      )}

      <Button className={css.header__btn} theme='outline' color='gray' onClick={handleLogout}>
        Log Out
      </Button>
    </>
  ) : (
    <>
      <Button className={css.header__btn} onClick={() => navigate('/sign-in')}>
        Sign in
      </Button>

      <Button
        className={css.header__btn}
        theme='outline'
        color='green'
        onClick={() => navigate('/sign-up')}
      >
        Sign up
      </Button>
    </>
  )

  return (
    <>
      <header className={css.header}>
        <Link to='/' className={css.header__link}>
          Realworld Blog
        </Link>
        <nav className={css.header__nav}>{panel}</nav>
        <Button className={css.header__menu} onClick={openModal} Icon={() => <BurgerIcon />} />
      </header>
      <main className={css.content} id='contentPage'>
        <Outlet />
        {children}
      </main>

      <ModalMenu ref={modalRef}>{panel}</ModalMenu>
    </>
  )
}
