import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
// import tasklists from 'markdown-it-task-lists';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import 'react-markdown-editor-lite/lib/index.css';

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
    return ''; // use external default escaping
  }
})
  .use(emoji)
  .use(subscript)
  .use(superscript)
  .use(footnote)
  .use(deflist)
  .use(abbreviation)
  .use(insert)
  .use(mark);
// .use(tasklists, { enabled: this.taskLists });

const Index = () => {
  // const [value, setValue] = useState('**qweqweqw**\n\n');

  return (
    <MdEditor
      style={{ minHeight: 'calc(100vh - 160px)' }}
      // value={value}
      renderHTML={(text) => {
        console.log(text);
        return mdParser.render(text);
      }}
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
      // onChange={({ text }) => {
      //   console.log({ text });
      //   setValue(text);
      // }}
    />
  );
};

export default Index;
