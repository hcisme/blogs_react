import { lazy, Suspense } from 'react';
import { Result } from 'antd';
import { UserSwitchOutlined, FileProtectOutlined, FormOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { PageLoading } from '@ant-design/pro-components';
import { getLocalStorage } from '../utils/localStorage';
// import Layout from '../layout';
// import Login from '../pages/g';
// import UserManage from '../pages/user-manage';
// import PublicBlog from '../pages/public-blogs';

export const basePath = '/home';

const Layout = lazy(() => import('../layout'));
const Login = lazy(() => import('../pages/g'));
const UserManage = lazy(() => import('../pages/user-manage'));
const ArticleMange = lazy(() => import('../pages/article-manage'));
const PublicBlog = lazy(() => import('../pages/public-blogs'));
const EditArticle = lazy(() => import('../pages/article-manage/edit-article'));
const PreviewArticle = lazy(() => import('../pages/article-manage/preview-article'));

const router = [
  {
    path: '/',
    element: <Navigate to={getLocalStorage('token') ? basePath : '/g'} />
  },
  {
    path: '/g',
    element: <Login />
  },
  {
    path: basePath,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to={`${basePath}/user-manage`} />
      },
      {
        path: `${basePath}/user-manage`,
        element: <UserManage />,
        name: '用户管理',
        icon: <UserSwitchOutlined />
      },
      {
        path: `${basePath}/article-manage`,
        element: <ArticleMange />,
        name: '文章管理',
        icon: <FileProtectOutlined />
      },
      {
        path: `${basePath}/public-blog`,
        element: <PublicBlog />,
        name: '发布博客',
        icon: <FormOutlined />
      },
      {
        path: `${basePath}/edit-article/:id`,
        element: <EditArticle />
      },
      {
        path: `${basePath}/preview-article/:id`,
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
