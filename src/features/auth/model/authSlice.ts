import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from './types'

const initialState: AuthState = {
  isAuthenticated: false,
  token: null
}

export const login = createAction<string>('login')

export const logout = createAction('logout')

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true
        state.token = action.payload
      })
      .addCase(logout, state => {
        state.isAuthenticated = false
        state.token = null
      })
  }
})
