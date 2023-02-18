import React from 'react';
import { Space } from 'antd';
import { useNavigate, Link, Outlet, Navigate } from 'react-router-dom';
import { PageContainer, ProLayout, RouteContext } from '@ant-design/pro-components';
import route, { basePath } from '../router';
import useToken from '../hooks/useToken';
import RightContent from './RightContent';
import logo from '../assets/images/Octocat.png';

const Index = () => {
  const navigate = useNavigate();
  const token = useToken();
  const newRoutingTable =
    route
      .find((item) => item.path === basePath)
      .children.filter((i) => i.icon)
      .map(({ path, name, icon }) => ({ path, name, icon })) || [];

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100%'
      }}
    >
      <ProLayout
        title="博客系统"
        logo={<img src={logo} alt="" />}
        fixSiderbar
        fixedHeader
        layout="mix"
        onMenuHeaderClick={() => navigate('/')}
        collapsedButtonRender={false}
        rightContentRender={() => <RightContent />}
        location={window.location}
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '600px'
          }
        ]}
        menuFooterRender={(props) =>
          !props.collapsed && (
            <div style={{ width: '100%' }}>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <span>© 2023 Made by chihaicheng</span>
                <Space direction="vertical">
                  <div>design by</div>
                  <div>
                    <a
                      href="https://ant-design.antgroup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ant Design
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://procomponents.ant.design"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      procomponents.ant.design
                    </a>
                  </div>
                </Space>
              </Space>
            </div>
          )
        }
        menuItemRender={(item, defaultDom) => {
          return <Link to={item.path}>{defaultDom}</Link>;
        }}
        route={{ routes: newRoutingTable }}
      >
        <RouteContext.Consumer>
          {() => {
            if (!token) {
              return <Navigate to="/" />;
            }
            return (
              <PageContainer pageHeaderRender={false}>
                <Outlet />
              </PageContainer>
            );
          }}
        </RouteContext.Consumer>
      </ProLayout>
    </div>
  );
};

export default Index;
