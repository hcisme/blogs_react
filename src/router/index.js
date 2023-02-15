import { lazy } from 'react';
import { Result } from 'antd';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorage';

const Layout = lazy(() => import('../pages/layout'));
const Login = lazy(() => import('../pages/g'));

const router = [
  {
    path: '/',
    element: <Navigate to={getLocalStorage('token') ? '/h' : '/g'} />
  },
  {
    path: '/g',
    element: <Login />
  },
  {
    path: '/h',
    element: <Layout />
  },
  {
    path: '*',
    element: <Result status="404" subTitle="找不到页面" />
  }
];

export default router;
