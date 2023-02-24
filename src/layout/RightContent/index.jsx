import React from 'react';
import { Avatar, Dropdown, message, Space, Tooltip } from 'antd';
import { LogoutOutlined, GithubOutlined, ShareAltOutlined } from '@ant-design/icons';
import { getLocalStorage } from '@/utils/localStorage';

function Index() {
  const { headImgUrl, nickname } = getLocalStorage('userInfo') || {};

  const items = [
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />
    }
  ];

  return (
    <Space align="center" size="middle">
      <Tooltip title={`V${1}.0`}>
        <ShareAltOutlined style={{ fontSize: 20 }} />
      </Tooltip>

      <Tooltip title="github">
        <GithubOutlined
          style={{ fontSize: 20 }}
          onClick={() => window.open('https://github.com/TristesAnima')}
        />
      </Tooltip>

      <Dropdown
        placement="bottomRight"
        menu={{
          items,
          onClick: ({ key }) => {
            switch (key) {
              case 'logout':
                message.success('退出登录成功');
                window.location.replace('/g');
                break;
              default:
                break;
            }
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <Avatar
            src={headImgUrl}
            style={
              !headImgUrl && {
                backgroundColor: '#fde3cf',
                color: '#f56a00'
              }
            }
          >
            u
          </Avatar>
          <span>{nickname}</span>
        </div>
      </Dropdown>
    </Space>
  );
}

export default Index;
