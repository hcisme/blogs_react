import React, { useState } from 'react';
import { Card, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { EditArticle } from '@/components';
import { useMessage } from '@/hooks';
import { saveArticles, getArticleInfoById } from '@/services/articles';
import { uploadImg } from '@/services/upload';

const Index = () => {
  const messagePro = useMessage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [saveLoading, setSaveLoading] = useState();

  const { loading, data: { data: articleInfo } = {} } = useRequest(() =>
    getArticleInfoById({ id })
  );

  const submit = async ({ formRef }) => {
    setSaveLoading(true);
    try {
      const values = await formRef.current.validateFields();
      const { coverImg: [{ url, file } = {}] = [] } = values;
      let coverImg = '';
      if (url) {
        coverImg = url;
      } else if (file) {
        const { imgUrl, success, uploadMsg } = await uploadImg({
          file
        });
        if (!success) {
          message.error(uploadMsg);
          setSaveLoading(false);
          return;
        }
        coverImg = imgUrl;
      }

      const response = await saveArticles({ ...values, tag: values.tag.join(','), coverImg }, id);
      setSaveLoading(false);
      messagePro({
        response,
        onSuccess: () => {
          navigate('/article-manage');
        }
      });
    } catch (error) {
      setSaveLoading(false);
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
