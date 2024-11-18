import { useDispatch, useSelector } from 'react-redux'
import type { ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import type { extraArgument, store } from '@/app/store'

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
