import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export function AuthRoute() {
  const { isAuthenticated } = useAuth()

  const location = useLocation()
  const frompage = location.state?.from?.pathname || '/'

  if (isAuthenticated) {
    return <Navigate to={frompage} replace />
  }

  return <Outlet />
}
