import React from 'react';
import { Button, Col, Row } from 'antd';
import { FooterToolbar, ProForm, ProFormText } from '@ant-design/pro-components';

const Index = () => {
  return (
    <>
      <ProForm
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Row>
          <Col span={24}>
          </Col>
          <Col span={24}>
            <ProFormText label="标题" name="title" />
          </Col>
          <Col span={24}>
            <ProForm.Item label="内容" name="title"></ProForm.Item>
          </Col>
        </Row>

        <FooterToolbar>
          <Button>重置</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FooterToolbar>
      </ProForm>
    </>
  );
};

export default Index;
