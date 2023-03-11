import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTargetArticle, getTargetUserArticles } from '@/services/articles';
import { getLocalStorage } from '@/utils/localStorage';
import { useMessage } from '@/hooks';

const Index = () => {
  const actionRef = useRef({});
  const navigate = useNavigate();
  const messagePro = useMessage();
  const { _id } = getLocalStorage('userInfo');

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '25%',
      ellipsis: { showTitle: false },
      renderText: (text, record) => (
        <Tooltip title={text} placement="topLeft">
          <a
            onClick={() => {
              navigate(`/preview-article/${record.id}`);
            }}
          >
            {text}
          </a>
        </Tooltip>
      )
    },
    {
      title: '分类',
      dataIndex: 'tag',
      width: '20%',
      render: (text) => {
        const tags = text?.split(',').map((item, index) => <Tag key={index}>{item}</Tag>);
        return (
          <Tooltip
            title={
              tags.length > 3
                ? text?.split(',').map((item, index) => (
                    <Tag key={index} color="cyan">
                      {item}
                    </Tag>
                  ))
                : null
            }
          >
            {tags?.slice(0, 3)}
          </Tooltip>
        );
      }
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      width: '18%',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      hideInSearch: true,
      width: '18%',
      render: (text) => text && dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '评论数量',
      dataIndex: 'commentTotal',
      hideInSearch: true,
      width: 80,
      render: (text) => text.length
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      hideInSearch: true,
      width: 80
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
                navigate(`/edit-article/${record._id}`);
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
      request={async (params) =>
        getTargetUserArticles({
          uid: _id,
          params
        })
      }
      search={{
        optionRender: (searchConfig, props, defaultDom) => defaultDom.reverse()
      }}
    />
  );
};

export default Index;
