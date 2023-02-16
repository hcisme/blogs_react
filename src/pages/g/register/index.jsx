import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { LockOutlined, UserOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import ClipAvatar from '../_compoents/ClipAvatar';

function Index() {
  return (
    <>
      <ProFormText
        label="用户名"
        name={['regist', 'username']}
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
        name={['regist', 'password']}
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
      <ProFormText
        label="昵称"
        name={['regist', 'nickname']}
        fieldProps={{
          prefix: <UsergroupDeleteOutlined />
        }}
        rules={[
          {
            required: true,
            message: '请输入昵称!'
          }
        ]}
      />
      <ProForm.Item
        label="头像"
        name={['regist', 'headImgUrl']}
        rules={[
          {
            required: true,
            message: '请上传图片!'
          }
        ]}
      >
        <ClipAvatar />
      </ProForm.Item>
    </>
  );
}

export default Index;
