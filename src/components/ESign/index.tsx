import React, { useState, useEffect } from 'react';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Col, message, Row } from 'antd';
import PubSub from 'pubsub-js';
import { request, encrypt, getLocalStorage, UserInfo } from '@/utils';

type CallBack = () => boolean | Promise<boolean>;
type Password = { password: string };

const key = 'ESign';
let cb: CallBack;

function Index() {
  const [open, setOpen] = useState(false);
  const { username, nickname } = (getLocalStorage('userInfo') as UserInfo) || {};

  useEffect(() => {
    // 订阅消息
    const token = PubSub.subscribe(
      key,
      (_, { visible, callback }: { visible: boolean; callback: CallBack }) => {
        setOpen(visible);
        cb = callback;
      }
    );

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const onFinish = async ({ password }: Password) => {
    const {
      data,
      success,
      message: msg
    } = await request('/api/sign', {
      method: 'post',
      data: {
        password: encrypt(password)
      }
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
    <ModalForm<Password>
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
          <ProFormText.Password
            label="密码"
            name="password"
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={24}>
          <ProForm.Item label="本地时间">{dayjs().format('YYYY-MM-DD HH:mm:ss')}</ProForm.Item>
        </Col>
      </Row>
    </ModalForm>
  );
}

export default Index;

export const eSign = ({ callback }: { callback: CallBack }) => {
  PubSub.publish(key, { visible: true, callback });
};
