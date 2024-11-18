import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { Layout } from '../layout'
import { Articles } from '@/pages/Articles'
import { Article } from '@/pages/Article'
import { NotFound } from '@/pages/NotFound'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'
import { PrivateRoute } from '@/shared/lib/routing/PrivateRoute'
import { AuthRoute } from '@/shared/lib/routing/AuthRote'
import { Profile } from '@/pages/Profile'
import { ArticleNew } from '@/pages/ArticleNew'
import { ArticleEdit } from '@/pages/ArticleEdit'

const routes = createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Navigate to='articles' replace />} />

    <Route path='articles' element={<Articles />} />
    <Route path='articles/:slug' element={<Article />} />

    <Route element={<AuthRoute />}>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
    </Route>

    <Route element={<PrivateRoute />}>
      <Route path='profile' element={<Profile />} />
      <Route path='new-article' element={<ArticleNew />} />
      <Route path='articles/:slug/edit' element={<ArticleEdit />} />
    </Route>

    <Route path='*' element={<NotFound />} />
  </Route>
)

export const router = createBrowserRouter(routes)
