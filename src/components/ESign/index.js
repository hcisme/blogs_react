import React, { useState, useEffect } from 'react';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Col, Row } from 'antd';
import PubSub from 'pubsub-js';
import { encrypt, getLocalStorage } from '@/utils';

const key = 'ESign';

function Index() {
  const [open, setOpen] = useState(false);
  const { username, nickname } = getLocalStorage('userInfo');

  useEffect(() => {
    // 订阅消息
    const token = PubSub.subscribe(key, (event, data) => {
      console.log(event, data);
      setOpen(true);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const onFinish = ({ password }) => {
    console.log(encrypt(password));
  };

  return (
    <ModalForm
      title="电子签名"
      open={open}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
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

export const eSign = () => {
  PubSub.publish(key, { visible: true });
};
