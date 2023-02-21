import React, { useRef } from 'react';
import { Avatar, Button, Col, Row, Space } from 'antd';
import { FooterToolbar, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quillEmoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import { getLocalStorage } from '../../utils/localStorage';
import { languageTagList } from '../../utils/dictionary';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
  {
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji
  },
  true
);

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }], //字体设置
      [{ color: [] }],
      [{ background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'], // a链接和图片的显示
      ['emoji']
    ]
  },
  'emoji-toolbar': true, //是否展示出来
  'emoji-shortname': true
};

function Index(props) {
  const { loading, initialValues = {}, onOk } = props;
  const formRef = useRef({});
  const { headImgUrl, nickname, username } = getLocalStorage('userInfo') || {};

  return (
    <ProForm
      formRef={formRef}
      submitter={false}
      initialValues={{ ...initialValues, tag: initialValues?.tag?.split(',') }}
    >
      <Row>
        <Col span={24}>
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
            <ReactQuill theme="snow" placeholder="请输入文章主体" modules={modules} />
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
