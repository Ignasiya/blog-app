import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  return <Outlet />
}
