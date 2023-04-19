import React, { useState, useRef, useEffect } from 'react';
import { LoginFormPage, ProFormInstance } from '@ant-design/pro-components';
import { Alert, Divider, message, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { uploadImg } from '@/services/upload';
import { userLogin, userRegister } from '@/services/user';
import {
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
  setLocalStorage,
  encrypt
} from '@/utils';
import logo from '@/assets/images/Octocat.png';

type RegistInfo = {
  username: string;
  password: string;
  nickname: string;
  headImgUrl: [{ file: File }];
};

type LoginInfo = Pick<RegistInfo, 'username' | 'password'>;

const Index = () => {
  const [loginType, setLoginType] = useState('login');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const formRef = useRef<ProFormInstance>();
  const loginstatusMessage = getSessionStorage('loginstatusMessage');

  const logine = async ({ username, password }: LoginInfo) => {
    setErrorText('');
    const {
      code,
      token,
      userInfo,
      message: info
    } = await userLogin({
      username,
      password: encrypt(password)
    });
    if (code === 200) {
      if (userInfo.role !== 1) {
        setErrorText(info);
        return false;
      }
      message.success(info);
      setLocalStorage('token', token);
      setLocalStorage('userInfo', userInfo);
      navigate('/user-manage', { replace: true });
      return true;
    }
    message.error(info);
    setErrorText(info);
    return false;
  };

  const register = async ({ password, headImgUrl, ...rest }: RegistInfo) => {
    setErrorText('');
    const { imgUrl, code, uploadMsg } = await uploadImg({
      file: headImgUrl[0].file
    });
    if (code === 200) {
      const { data: registerInfo } = await userRegister({
        ...rest,
        headImgUrl: imgUrl,
        password: encrypt(password)
      });
      if (registerInfo.code === 200) {
        formRef.current?.resetFields();
        message.success(registerInfo.message);
        setLoginType('login');
        return true;
      }
      message.error(registerInfo.message);
      return false;
    }
    message.error(uploadMsg);
    return false;
  };

  useEffect(() => {
    removeLocalStorage('token');
    removeLocalStorage('userInfo');

    if (loginstatusMessage) {
      message.error(loginstatusMessage);
      removeSessionStorage('loginstatusMessage');
    }
  }, []);

  return (
    <LoginFormPage<{ login: LoginInfo; regist: RegistInfo }>
      backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo={logo}
      title="博客后台管理"
      subTitle="---chihaicheng"
      actions={
        <div style={{ textAlign: 'center' }}>
          <Divider />
          <a
            href="https://beian.miit.gov.cn/"
            target="_black"
            style={{ fontSize: 12 }}
          >
            辽ICP备 2021010497号-2
          </a>
        </div>
      }
      message={
        errorText && (
          <Alert
            type="warning"
            showIcon
            message={errorText}
          />
        )
      }
      layout="horizontal"
      labelAlign="right"
      labelCol={{ span: 5 }}
      wrapperCol={{ flex: 1 }}
      formRef={formRef}
      submitter={{ searchConfig: { submitText: loginType === 'login' ? '登录' : '注册' } }}
      onFinish={async ({ login, regist }) => {
        if (login) {
          return logine(login);
        }
        return register(regist);
      }}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => {
          setErrorText('');
          setLoginType(activeKey);
        }}
        destroyInactiveTabPane
        items={[
          {
            key: 'login',
            label: '登录',
            children: <Login />
          },
          {
            key: 'register',
            label: '注册',
            children: <Register />
          }
        ]}
      />
    </LoginFormPage>
  );
};

export default Index;
