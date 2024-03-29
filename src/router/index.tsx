import React, { lazy, Suspense } from 'react';
import { Result } from 'antd';
import { Navigate, RouteObject } from 'react-router-dom';
import { PageLoading } from '@ant-design/pro-components';

const Layout = lazy(() => import('@/layout'));
const Login = lazy(() => import('@/pages/g'));
const UserManage = lazy(() => import('@/pages/user-manage'));
const ArticleMange = lazy(() => import('@/pages/article-manage'));
const PublicBlog = lazy(() => import('@/pages/public-blogs'));
const EditArticle = lazy(() => import('@/pages/article-manage/edit-article'));
const PreviewArticle = lazy(() => import('@/pages/article-manage/preview-article'));
const Redirecting = lazy(() => import('@/pages/redirecting'));

const router: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/redirecting" />
  },
  {
    path: '/redirecting',
    element: <Redirecting />
  },
  {
    path: '/g',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/user-manage',
        element: <UserManage />
      },
      {
        path: '/article-manage',
        element: <ArticleMange />
      },
      {
        path: '/public-blog',
        element: <PublicBlog />
      },
      {
        path: '/edit-article/:id',
        element: <EditArticle />
      },
      {
        path: '/preview-article/:id',
        element: <PreviewArticle />
      }
    ].map((item) => ({
      ...item,
      element: item.element && <Suspense fallback={<PageLoading />}>{item.element}</Suspense>
    }))
  },
  {
    path: '*',
    element: <Result status="404" subTitle="找不到页面" />
  }
];

export default router;
