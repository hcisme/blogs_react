import React from 'react';
import { Card } from 'antd';
import { useRequest } from 'ahooks';
import EditArticle from '@/component/EditArticle';
import useMessage from '@/hooks/useMessage';
import { publicArticles } from '@/services/articles';

const Index = () => {
  const messagePro = useMessage();

  const { runAsync: publicArticlesRunAsync, loading } = useRequest(
    (values) => publicArticles({ ...values, tag: values.tag.join(',') }),
    { manual: true }
  );

  const submit = async ({ formRef }) => {
    try {
      const values = await formRef.current.validateFields();
      const response = await publicArticlesRunAsync(values);
      messagePro({
        response,
        onSuccess: () => {
          formRef.current.resetFields();
        }
      });
    } catch (error) {}
  };

  return (
    <Card>
      <EditArticle loading={loading} onOk={submit} />
    </Card>
  );
};

export default Index;
