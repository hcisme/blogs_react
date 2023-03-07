import React, { useRef } from 'react';
import { Avatar, Button, Col, Row, Space } from 'antd';
import { FooterToolbar, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { getLocalStorage } from '@/utils/localStorage';
import { languageTagList } from '@/utils/dictionary';
import ClipAvatar from '@/component/ClipAvatar';
import Editor from '@/component/Editor';

function Index(props) {
  const { loading, initialValues = {}, onOk } = props;
  const formRef = useRef({});
  const { headImgUrl, nickname, username } = getLocalStorage('userInfo') || {};

  return (
    <ProForm
      formRef={formRef}
      submitter={false}
      initialValues={{
        ...initialValues,
        tag: initialValues?.tag?.split(','),
        coverImg: initialValues.coverImg ? [{ url: initialValues.coverImg }] : []
      }}
    >
      <Row>
        <Col span={12}>
          <ProForm.Item label="发布者">
            <Space align="end">
              <Avatar shape="square" size="large" src={headImgUrl} />
              <Space size={0} direction="vertical">
                <div>
                  <span style={{ fontSize: 13 }}>用户名:</span> <a>{username}</a>
                </div>
                <span>昵称: {nickname}</span>
              </Space>
            </Space>
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProForm.Item label="封面" name="coverImg">
            <ClipAvatar text="选择文章封面" aspect={16 / 9} />
          </ProForm.Item>
        </Col>
        <Col span={24}>
          <ProFormText
            label="标题"
            name="title"
            rules={[{ required: true }]}
            placeholder="请输入文章标题"
          />
        </Col>
        <Col span={24}>
          <ProFormSelect
            label="标签"
            name="tag"
            fieldProps={{ mode: 'tags' }}
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value.length > 5) {
                    return Promise.reject(new Error('标签最多选择5个'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            placeholder="请输入文章标签"
            options={languageTagList.map((item) => ({ label: item, value: item }))}
          />
        </Col>
        <Col span={24}>
          <ProForm.Item label="内容" name="content" rules={[{ required: true }]}>
            <Editor />
          </ProForm.Item>
        </Col>
      </Row>

      <FooterToolbar>
        <Button
          onClick={() => {
            formRef.current.resetFields();
          }}
        >
          重置
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            onOk({ formRef });
          }}
        >
          提交
        </Button>
      </FooterToolbar>
    </ProForm>
  );
}

export default Index;
