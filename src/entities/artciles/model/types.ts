import { z } from 'zod'

const ArticleShema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string().nullable().optional(),
  tagList: z.array(z.string()).nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: z.object({
    username: z.string(),
    bio: z.string().nullable().optional(),
    image: z.string(),
    following: z.boolean()
  })
})

export const ArticlesDtoShema = z.object({
  articles: z.array(ArticleShema),
  articlesCount: z.number()
})

export const ArticleDtoShema = z.object({
  article: ArticleShema
})

export type Author = {
  username: string
  bio?: string | null
  image: string
  following: boolean
}

export type Article = {
  slug: string
  title: string
  description: string
  body?: string | null
  tagList?: string[] | null
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export type GetArticlesResponse = {
  articles: Article[]
  articlesCount: number
}

export type GetArticleResponse = {
  article: Article
}

export type ArticleRequest = {
  title: string
  description: string
  body: string
  tagList: string[]
}
