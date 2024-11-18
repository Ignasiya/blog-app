export type FormUpdateUser = {
  email: string
  username: string
  password?: string
  image?: string
}

export type FormUpdateUserError = {
  username?: string
  email?: string
  password?: string
  image?: string
}
