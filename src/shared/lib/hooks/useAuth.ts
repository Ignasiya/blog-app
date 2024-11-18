import { useAppSelector, useAppDispatch } from '@/shared/lib/redux'
import { authSlice, login, logout } from '@/features/auth'
import { resetApiState } from '@/shared/api/baseApi'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(authSlice.selectors.isAuthenticated)

  const handleLogin = (token: string) => {
    dispatch(login(token))
    dispatch(resetApiState())
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetApiState())
  }

  return {
    isAuthenticated,
    handleLogin,
    handleLogout
  }
}
