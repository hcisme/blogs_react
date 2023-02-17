import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PageLoading } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<PageLoading />}>
        <App />
      </Suspense>
    </ConfigProvider>
  </BrowserRouter>
);
