import { useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';

const Index = () => {
  const actionRef = useRef({});

  const columns = [
    {
      dataIndex: 'index',
      width: 48,
      hideInSearch: true
    },
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩'
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'state'
    },
    {
      disable: true,
      title: '标签',
      dataIndex: 'labels',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      hideInSearch: true
    }
  ];

  return (
    <ProTable
      dataSource={[]}
      columns={columns}
      actionRef={actionRef}
      tableLayout="fixed"
      rowKey="id"
      search={{
        optionRender: (searchConfig, props, defaultDom) => defaultDom.reverse()
      }}
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      ]}
    />
  );
};

export default Index;
