import React, { useRef } from 'react';
import { Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { useMessage } from '@/hooks';
import { deleteTargetUser, getAllUserList } from '@/services/user';
import { getLocalStorage } from '@/utils/localStorage';
import DrawerForm from './Edit';

const Index = () => {
  const actionRef = useRef({});
  const { _id } = getLocalStorage('userInfo') || {};
  const messagePro = useMessage();

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickname'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (text) => dayjs(text).format('YYYY-MM-DD')
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: {
        1: {
          text: '超级管理员'
        },
        2: {
          text: '普通用户'
        }
      }
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <DrawerForm
            title="编辑"
            disabled={record?._id === _id}
            record={record}
            onOk={() => {
              actionRef.current?.reload();
            }}
          >
            <a title={record?._id === _id ? '预览' : '编辑'}>
              {record?._id === _id ? <EyeOutlined /> : <EditOutlined />}
            </a>
          </DrawerForm>
          {record?._id !== _id && record?.role === 2 && (
            <Popconfirm
              title="确认删除此用户吗"
              onConfirm={async () => {
                const response = await deleteTargetUser({ id: record._id });
                messagePro({
                  response,
                  onSuccess: () => {
                    actionRef.current.reload();
                  }
                });
                return response.success;
              }}
            >
              <a title="删除">
                <DeleteOutlined />
              </a>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      rowKey="_id"
      search={{
        optionRender: (searchConfig, props, defaultDom) => defaultDom.reverse()
      }}
      request={async (params) =>
        getAllUserList({
          params
        })
      }
    />
  );
};

export default Index;
