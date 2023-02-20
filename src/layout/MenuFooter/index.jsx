import React from 'react';
import { Space } from 'antd';

function Index() {
  return (
    <div style={{ width: '100%', paddingLeft: 6 }}>
      <Space direction="vertical" align="start" style={{ width: '100%' }}>
        <span>© 2023 Made by chihaicheng</span>
        <Space direction="vertical">
          <div>design by</div>
          <div>
            <a href="https://ant-design.antgroup.com" target="_blank" rel="noopener noreferrer">
              Ant Design
            </a>
          </div>
          <div>
            <a href="https://procomponents.ant.design" target="_blank" rel="noopener noreferrer">
              procomponents.ant.design
            </a>
          </div>
        </Space>
        <a href="https://beian.miit.gov.cn/" target="_black" style={{ fontSize: 12 }}>
          辽ICP备 2021010497号-2
        </a>
      </Space>
    </div>
  );
}

export default Index;
