import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popconfirm, Space, Tag } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTargetArticle, getTargetUserArticles } from '../../services/articles';
import { getLocalStorage } from '../../utils/localStorage';
import useMessage from '../../hooks/useMessage';

const Index = () => {
  const actionRef = useRef({});
  const navigate = useNavigate();
  const messagePro = useMessage();
  const { _id } = getLocalStorage('userInfo');

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text, record) => (
        <a
          onClick={() => {
            navigate(`/home/preview-article/${record.id}`);
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: '分类',
      dataIndex: 'tag',
      render: (text) => text?.split(',').map((item, index) => <Tag key={index}>{item}</Tag>)
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (text) => dayjs(text).format('YYYY-MM-DD hh-mm')
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      hideInSearch: true,
      render: (text) => text && dayjs(text).format('YYYY-MM-DD hh-mm')
    },
    {
      title: '评论数量',
      dataIndex: 'commentTotal',
      hideInSearch: true
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      hideInSearch: true
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Space>
            <a
              onClick={() => {
                navigate(`/home/edit-article/${record._id}`);
              }}
              title="编辑"
            >
              <EditOutlined />
            </a>
            <Popconfirm
              title="确定删除该文章吗？"
              onConfirm={async () => {
                const response = await deleteTargetArticle({ aid: record._id });
                messagePro({
                  response,
                  onSuccess: () => {
                    actionRef.current?.reload();
                  }
                });
                return response.success;
              }}
            >
              <a title="删除">
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      columnEmptyText={false}
      rowKey="_id"
      request={async (params) => {
        const { success, data: { data = [], total } = {} } = await getTargetUserArticles({
          uid: _id,
          params
        });
        return {
          success,
          data,
          total
        };
      }}
      search={{
        optionRender: (searchConfig, props, defaultDom) => defaultDom.reverse()
      }}
    />
  );
};

export default Index;
