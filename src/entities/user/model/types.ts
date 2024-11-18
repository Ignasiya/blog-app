import { z } from 'zod'

export type User = {
  email: string
  username: string
  image?: string
  password?: string
}

export type RegisterRequest = {
  email: string
  username: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type UserResponse = {
  user: { email: string; token: string; username: string; image?: string | null }
}

export const UserDtoShema = z.object({
  user: z.object({
    email: z.string(),
    token: z.string(),
    username: z.string(),
    image: z.string().nullable().optional()
  })
})
