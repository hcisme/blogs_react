import MarkdownIt from 'markdown-it';
// markdown-it 插件
import emoji from 'markdown-it-emoji';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import footnote from 'markdown-it-footnote';
import deflist from 'markdown-it-deflist';
import abbreviation from 'markdown-it-abbr';
import insert from 'markdown-it-ins';
// import mark from 'markdown-it-mark';
import taskList from 'markdown-it-task-lists';
// #end
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import nginx from 'highlight.js/lib/languages/nginx';

function useMdParse() {
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('nginx', nginx);
  hljs.configure({
    ignoreUnescapedHTML: true
  });
  return (
    new MarkdownIt({
      html: true,
      linkify: true,
      typographer: false,
      xhtmlOut: true,
      breaks: true,
      langPrefix: 'language-',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
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
      // .use(mark)
      .use(taskList)
  );
}

export default useMdParse;
