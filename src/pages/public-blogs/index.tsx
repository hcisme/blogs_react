import React, { useState } from 'react';
import { Card, message } from 'antd';
import { EditArticle } from '@/components';
import { useMessage } from '@/hooks';
import { publicArticles } from '@/services/articles';
import { uploadImg } from '@/services/upload';
import { ProFormInstance } from '@ant-design/pro-components';

type FormValues = {
  tag: string[];
  coverImg?: [{ file: File }];
  title: string;
  content: string;
};

const Index = () => {
  const messagePro = useMessage();
  const [loading, setLoading] = useState(false);

  const submit = async ({
    formRef
  }: {
    formRef: React.MutableRefObject<ProFormInstance | undefined>;
  }) => {
    setLoading(true);
    let coverImg;
    try {
      const values = (await formRef.current?.validateFields()) as FormValues;
      if (values.coverImg?.length) {
        const { imgUrl, success, uploadMsg } = await uploadImg({
          file: values.coverImg[0].file
        });
        if (!success) {
          message.error(uploadMsg);
          setLoading(false);
          return;
        }
        coverImg = imgUrl;
      }
      const response = await publicArticles({
        ...values,
        tag: values.tag.join(','),
        coverImg
      });
      setLoading(false);
      messagePro({
        response,
        onSuccess: () => {
          formRef.current?.resetFields();
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card>
      <EditArticle
        loading={loading}
        onOk={submit}
      />
    </Card>
  );
};

export default Index;
