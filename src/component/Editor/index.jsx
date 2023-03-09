import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
// 解析md格式的插件
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadImg } from '@/services/upload';
import useMessage from '@/hooks/useMessage';

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  xhtmlOut: true,
  breaks: true,
  langPrefix: 'language-',
});

const Index = (props) => {
  const { id, value, onChange } = props;
  const messagePro = useMessage();

  const handleImageUpload = async (file, callback) => {
    const { imgUrl, success } = await uploadImg({
      file
    });
    messagePro({
      response: { success },
      successText: '上传成功',
      onSuccess: () => {
        callback(imgUrl);
      }
    });
  };

  return (
    <MdEditor
      id={id}
      value={value}
      placeholder="请输入发布文章内容"
      renderHTML={(text) => mdParser.render(text)}
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
      onChange={({ text }) => {
        onChange(text);
      }}
      onImageUpload={handleImageUpload}
    />
  );
};

export default Index;
