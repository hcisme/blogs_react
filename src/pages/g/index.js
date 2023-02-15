import { useState, useRef } from 'react';
import { LoginFormPage } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { uploadImg } from '../../services/upload';
import { userLogin, userRegister } from '../../services/user';
import { setLocalStorage } from '../../utils/localStorage';

const Index = () => {
  const [loginType, setLoginType] = useState('login');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
  const formRef = useRef({});

  const onFinish = async ({ values }) => {
    if (values.headImgUrl) {
      const { data: { code, data } = {} } = await uploadImg({
        file: values.headImgUrl[0].file
      });
      if (code === 200) {
        const { data: registerInfo } = await userRegister({
          ...values,
          headImgUrl: data
        });
        if (registerInfo.code === 200) {
          formRef.current.resetFields();
          message.success(registerInfo.message);
          setLoginType('login');
        }
      }
      return true;
    }
    const {
      data: { code, token, userInfo, message: info }
    } = await userLogin(values);
    if (code === 200) {
      message.success(info);
      setLocalStorage('token', token);
      setLocalStorage('userInfo', userInfo);
      navigate('/h', { replace: true });
      return true;
    }
    message.error(info);
    setErrorText(info);
    return false;
  };

  return (
    <LoginFormPage
      backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      title="博客后台管理"
      subTitle="---chihaicheng"
      actions={false}
      message={errorText && <Alert type="warning" message={errorText} />}
      layout="horizontal"
      labelAlign="right"
      labelCol={{ span: 5 }}
      wrapperCol={{ flex: 1 }}
      formRef={formRef}
      onFinish={async (values) => onFinish({ values })}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => setLoginType(activeKey)}
        items={[
          {
            key: 'login',
            label: '登录'
          },
          {
            key: 'register',
            label: '注册'
          }
        ]}
      />
      {loginType === 'login' && <Login />}
      {loginType === 'register' && <Register />}
    </LoginFormPage>
  );
};

export default Index;
