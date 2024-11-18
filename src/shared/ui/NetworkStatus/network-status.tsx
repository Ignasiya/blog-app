import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import { OfflineIcon } from '@/shared/ui/Icons'
import css from './network-status.module.scss'

type NetworkStatusProps = {
  children: React.ReactNode
}

export function NetworkStatus({ children }: NetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return !isOnline ? (
    <div className={css.warning}>
      <OfflineIcon className={css.warning__image} />
      <div className={css.warning__desc}>
        You are not connected to the Internet. Please check your internet connection.
      </div>
      <Button theme='filled' onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  ) : (
    children
  )
}
