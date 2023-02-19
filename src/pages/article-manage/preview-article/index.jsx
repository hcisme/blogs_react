import React, { useEffect } from 'react';
import { Space, Spin, Tooltip } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { EyeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.core.css';
// import 'react-quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';
import { getArticleInfoById } from '../../../services/articles';
import CodeHighLight from '../../../component/CodeHighLight';

function Index() {
  const { id } = useParams();
  const { loading, data: { data: { data: articleInfo = {} } = {} } = {} } = useRequest(() =>
    getArticleInfoById({ id })
  );

  useEffect(() => {}, []);

  return (
    <ProCard
      headerBordered
      title={articleInfo.title}
      extra={
        <Space>
          <span>
            创建时间：
            {dayjs(articleInfo.createdAt).format('YYYY-MM-DD HH:mm')}
          </span>
          <Tooltip title="浏览量">
            <span>
              <a>
                <EyeOutlined />：
              </a>
              {articleInfo.views}
            </span>
          </Tooltip>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <CodeHighLight html={articleInfo.content} />
      </Spin>
    </ProCard>
  );
}

export default Index;
