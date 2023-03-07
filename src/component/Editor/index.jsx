import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
// 解析md格式的插件
import MarkdownIt from 'markdown-it';
// #region markdown-it 插件
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import taskList from 'markdown-it-task-lists';
// #endRegion
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/agate.css';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadImg } from '@/services/upload';
import useMessage from '@/hooks/useMessage';

hljs.registerLanguage('javascript', javascript);
hljs.configure({
  ignoreUnescapedHTML: true
});

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        console.log(__);
      }
    }
    return '';
  }
})
  .use(emoji)
  .use(subscript)
  .use(superscript)
  .use(footnote)
  .use(deflist)
  .use(abbreviation)
  .use(insert)
  .use(mark)
  .use(taskList);

const Index = (props) => {
  const { id, value, onChange } = props;
  const messagePro = useMessage();

  const handleImageUpload = async (file, callback) => {
    const {
      data: { data: imgUrl } = {},
      data = {},
      success
    } = await uploadImg({
      file
    });
    messagePro({
      response: { success, data },
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
