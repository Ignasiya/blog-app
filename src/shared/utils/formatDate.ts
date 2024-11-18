import { format } from 'date-fns'

export const formatDate = (createdAt: string) => {
  return format(new Date(createdAt), 'MMMM d, yyyy')
}
