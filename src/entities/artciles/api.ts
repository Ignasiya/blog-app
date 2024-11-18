import { baseApi } from '@/shared/api/baseApi'
import {
  ArticleDtoShema,
  ArticleRequest,
  ArticlesDtoShema,
  GetArticleResponse,
  GetArticlesResponse
} from './model/types'

export const articlesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getArticles: build.query<GetArticlesResponse, number | void>({
      query: (offset = 0) => ({
        url: `/articles?offset=${offset}`
      }),
      providesTags: result =>
        result
          ? [
              ...result.articles.map(({ slug }: { slug: string }) => ({
                type: 'Articles' as const,
                slug
              })),
              { type: 'Articles', id: 'LIST' }
            ]
          : [{ type: 'Articles', id: 'LIST' }],
      transformResponse: (response: unknown) => ArticlesDtoShema.parse(response)
    }),
    getArticle: build.query<GetArticleResponse, string>({
      query: slug => ({
        url: `/articles/${slug}`
      }),
      providesTags: (_, __, slug) => [{ type: 'Articles', slug }],
      transformResponse: (response: unknown) => ArticleDtoShema.parse(response)
    }),
    deleteArticle: build.mutation<void, string>({
      query: slug => ({
        url: `/articles/${slug}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', slug }]
    }),
    createArticle: build.mutation<GetArticleResponse, ArticleRequest>({
      query: data => ({
        url: '/articles',
        method: 'POST',
        body: { article: data },
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }]
    }),
    updateArticle: build.mutation<GetArticleResponse, { slug: string; data: ArticleRequest }>({
      query: ({ slug, data }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article: data }
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', slug }]
    }),
    favoriteArticle: build.mutation<GetArticleResponse, string>({
      query: slug => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST'
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', slug }],
      transformResponse: (response: unknown) => ArticleDtoShema.parse(response)
    }),
    unfavoriteArticle: build.mutation<GetArticleResponse, string>({
      query: slug => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE'
      }),
      invalidatesTags: (_, __, slug) => [{ type: 'Articles', slug }],
      transformResponse: (response: unknown) => ArticleDtoShema.parse(response)
    })
  }),
  overrideExisting: true
})

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useDeleteArticleMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation
} = articlesApi
