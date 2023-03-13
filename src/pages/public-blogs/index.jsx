import React from 'react';
import { Card } from 'antd';
import { useRequest } from 'ahooks';
import { EditArticle } from '@/components';
import { useMessage } from '@/hooks';
import { publicArticles } from '@/services/articles';
import { uploadImg } from '@/services/upload';

const Index = () => {
  const messagePro = useMessage();

  const { runAsync: publicArticlesRunAsync, loading } = useRequest(
    (values) => publicArticles({ ...values, tag: values.tag.join(',') }),
    { manual: true }
  );

  const submit = async ({ formRef }) => {
    try {
      const values = await formRef.current.validateFields();
      let coverImg;
      if (values?.coverImg?.length) {
        const { imgUrl } = await uploadImg({
          file: values.coverImg[0].file
        });
        coverImg = imgUrl;
      }
      const response = await publicArticlesRunAsync({ ...values, coverImg });
      messagePro({
        response,
        onSuccess: () => {
          formRef.current.resetFields();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <EditArticle loading={loading} onOk={submit} />
    </Card>
  );
};

export default Index;
