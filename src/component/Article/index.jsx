import React, { useEffect, useRef } from 'react';
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
import 'highlight.js/styles/agate.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'react-markdown-editor-lite/lib/index.css';
import './index.css';

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

function Index(props) {
  const { html } = props;
  const ref = useRef({});

  useEffect(() => {
    ref?.current?.querySelectorAll('pre').forEach((element) => {
      hljs.highlightElement(element);
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: mdParser.render(html) }} ref={ref} />;
}

export default Index;
