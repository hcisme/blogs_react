import React from 'react';
import { ProFormText } from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Index() {
  return (
    <>
      <ProFormText
        label="用户名"
        name="username"
        fieldProps={{
          prefix: <UserOutlined />
        }}
        rules={[
          {
            required: true,
            message: '请输入用户名!'
          }
        ]}
      />
      <ProFormText.Password
        label="密码"
        name="password"
        fieldProps={{
          prefix: <LockOutlined />
        }}
        rules={[
          {
            required: true,
            message: '请输入密码！'
          }
        ]}
      />
    </>
  );
}

export default Index;
