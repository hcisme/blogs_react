import React, { useState, useEffect } from 'react';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Col, message, Row } from 'antd';
import PubSub from 'pubsub-js';
import { axios, encrypt, getLocalStorage } from '@/utils';

const key = 'ESign';
let cb;

function Index() {
  const [open, setOpen] = useState(false);
  const { username, nickname } = getLocalStorage('userInfo') || {};

  useEffect(() => {
    // 订阅消息
    const token = PubSub.subscribe(key, (event, { visible, callback }) => {
      setOpen(visible);
      cb = callback;
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const onFinish = async ({ password }) => {
    const {
      data,
      success,
      message: msg
    } = await axios.post('/api/sign', {
      password: encrypt(password)
    });
    if (data && success) {
      const success = await cb();
      if (success) {
        setOpen(false);
        return success;
      }
      return success;
    }
    message.info(msg);
    return data;
  };

  return (
    <ModalForm
      title="电子签名"
      open={open}
      width={500}
      autoFocusFirstInput
      layout="inline"
      labelAlign="right"
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setOpen(false);
        }
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ flex: 1 }}
      onFinish={onFinish}
    >
      <Row gutter={[0, 12]}>
        <Col span={24}>
          <ProForm.Item label="账号">{username}</ProForm.Item>
        </Col>
        <Col span={24}>
          <ProForm.Item label="昵称">{nickname}</ProForm.Item>
        </Col>
        <Col span={24}>
          <ProFormText.Password label="密码" name="password" rules={[{ required: true }]} />
        </Col>
        <Col span={24}>
          <ProForm.Item label="本地时间" name="password">
            {dayjs().format('YYYY-MM-DD HH:mm:ss')}
          </ProForm.Item>
        </Col>
      </Row>
    </ModalForm>
  );
}

export default Index;

export const eSign = ({ callback }) => {
  PubSub.publish(key, { visible: true, callback });
};
