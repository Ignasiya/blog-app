import { baseApi } from '@/shared/api/baseApi'
import { UserDtoShema, RegisterRequest, UserResponse, LoginRequest, User } from './model/types'

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    registerNewUser: build.mutation<UserResponse, RegisterRequest>({
      query: ({ username, email, password }) => ({
        url: '/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { user: { username, email, password } }
      }),
      invalidatesTags: [{ type: 'User', id: 'AUTH' }],
      transformResponse: (response: unknown) => UserDtoShema.parse(response)
    }),
    login: build.mutation<UserResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { user: { email, password } }
      }),
      invalidatesTags: [{ type: 'User', id: 'AUTH' }],
      transformResponse: (response: unknown) => UserDtoShema.parse(response)
    }),
    getUser: build.query<UserResponse, void>({
      query: () => ({
        url: '/user'
      }),
      providesTags: [{ type: 'User', id: 'AUTH' }],
      transformResponse: (response: unknown) => UserDtoShema.parse(response)
    }),
    updateUser: build.mutation<UserResponse, User>({
      query: (user: User) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { user }
      }),
      invalidatesTags: [{ type: 'User', id: 'AUTH' }],
      transformResponse: (response: unknown) => UserDtoShema.parse(response)
    })
  }),
  overrideExisting: true
})

export const {
  useRegisterNewUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation
} = userApi
