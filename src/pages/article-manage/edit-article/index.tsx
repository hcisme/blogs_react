import React, { useState } from 'react';
import { Card, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { ProFormInstance } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { EditArticle } from '@/components';
import { useMessage } from '@/hooks';
import { saveArticles, getArticleInfoById } from '@/services/articles';
import { uploadImg } from '@/services/upload';
import { UserInfo } from '@/utils';

export interface ArticleInfo {
  author: UserInfo;
  tag: string;
  coverImg?: string;
  title: string;
  content: string;
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  commentTotal: any[];
}

export interface SubmitConfig {
  tag: string[];
  coverImg: [{ file?: File; url?: string }];
  title: string;
  content: string;
}

const Index = () => {
  const messagePro = useMessage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>() as { id: string };
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const { loading, data: articleInfo }: { loading: boolean; data?: ArticleInfo } = useRequest(
    async () => {
      const { data } = await getArticleInfoById({ id });
      return data;
    }
  );

  const submit = async ({
    formRef
  }: {
    formRef: React.MutableRefObject<ProFormInstance | undefined>;
  }) => {
    setSaveLoading(true);
    try {
      const values: SubmitConfig = await formRef.current?.validateFields();
      const {
        coverImg: [{ url, file }]
      } = values;
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
          <EditArticle
            loading={saveLoading}
            onOk={submit}
            initialValues={articleInfo}
          />
        )}
      </Card>
    </Spin>
  );
};

export default Index;
