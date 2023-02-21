import React from 'react';
import { Card, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import EditArticle from '../../../component/EditArticle';
import useMessage from '../../../hooks/useMessage';
import { saveArticles, getArticleInfoById } from '../../../services/articles';

const Index = () => {
  const messagePro = useMessage();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, data: { data: { data: articleInfo } = {} } = {} } = useRequest(() =>
    getArticleInfoById({ id })
  );

  const { runAsync: saveArticlesRunAsync, loading: saveLoading } = useRequest(
    (values) => saveArticles({ ...values, tag: values.tag.join(',') }, id),
    { manual: true }
  );

  const submit = async ({ formRef }) => {
    try {
      const values = await formRef.current.validateFields();
      const response = await saveArticlesRunAsync(values);
      messagePro({
        response,
        onSuccess: () => {
          navigate('/article-manage');
        }
      });
    } catch (error) {}
  };

  return (
    <Spin spinning={loading}>
      <Card>
        {articleInfo?.id && (
          <EditArticle loading={saveLoading} onOk={submit} initialValues={articleInfo} />
        )}
      </Card>
    </Spin>
  );
};

export default Index;
