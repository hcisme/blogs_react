import { lazy } from 'react';
import { Result } from 'antd';
import { UserSwitchOutlined, FileProtectOutlined, FormOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorage';

const Layout = lazy(() => import('../layout'));
const Login = lazy(() => import('../pages/g'));

const router = [
  {
    path: '/',
    element: <Navigate to={getLocalStorage('token') ? '/home' : '/g'} />
  },
  {
    path: '/g',
    element: <Login />
  },
  {
    path: '/home',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Navigate to="/home/user-manage" />
      },
      {
        path: '/home/user-manage',
        name: '用户管理',
        element: <>用户管理</>,
        icon: <UserSwitchOutlined />
      },
      {
        path: '/home/article-manage',
        name: '文章管理',
        element: <>文章管理</>,
        icon: <FileProtectOutlined />
      },
      {
        path: '/home/public-blog',
        name: '发布博客',
        element: <>发布博客</>,
        icon: <FormOutlined />
      }
    ]
  },
  {
    path: '*',
    element: <Result status="404" subTitle="找不到页面" />
  }
];

export default router;
