import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/base16/atelier-forest-light.css';
import javascript from 'highlight.js/lib/languages/javascript';
import './index.css';

hljs.registerLanguage('javascript', javascript);

hljs.configure({
  ignoreUnescapedHTML: true
});

function Index(props) {
  const { html } = props;
  const ref = useRef({});

  useEffect(() => {
    let timer = setTimeout(() => {
      ref?.current?.querySelectorAll('pre').forEach((element) => {
        hljs.highlightElement(element);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} ref={ref} />;
}

export default Index;
