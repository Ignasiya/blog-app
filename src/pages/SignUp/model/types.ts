export type FormRegistration = {
  username: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export type FormError = {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
}
