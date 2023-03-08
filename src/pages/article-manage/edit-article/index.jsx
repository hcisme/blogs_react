import React from 'react';
import { Card, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import EditArticle from '@/component/EditArticle';
import useMessage from '@/hooks/useMessage';
import { saveArticles, getArticleInfoById } from '@/services/articles';
import { uploadImg } from '@/services/upload';

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
      let coverImg = '';
      if (values?.coverImg?.length) {
        const { imgUrl } = await uploadImg({
          file: values.coverImg[0].file
        });
        coverImg = imgUrl;
      }
      const response = await saveArticlesRunAsync({ ...values, coverImg });
      messagePro({
        response,
        onSuccess: () => {
          navigate('/article-manage');
        }
      });
    } catch (error) {
      console.log(error);
    }
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
