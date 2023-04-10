import React from 'react';
import { useNavigate, Link, Outlet, Navigate } from 'react-router-dom';
import { PageContainer, ProLayout, RouteContext } from '@ant-design/pro-components';
import logo from '@/assets/images/Octocat.png';
import { getLocalStorage } from '@/utils';
import { ESign } from '@/components';
import newRouterList from './menu.config';
import RightContent from './RightContent';
import MenuFooter from './MenuFooter';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh'
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
        menuFooterRender={(props) => !props?.collapsed && <MenuFooter />}
        menuItemRender={({ path = '' }, defaultDom) => {
          return <Link to={path}>{defaultDom}</Link>;
        }}
        route={{ routes: newRouterList }}
      >
        <RouteContext.Consumer>
          {() => {
            return (
              <PageContainer pageHeaderRender={false}>
                {getLocalStorage('token') ? (
                  <div
                    id="preview-article-scrollableDiv"
                    style={{
                      overflow: 'auto'
                    }}
                  >
                    <Outlet />
                    <ESign />
                  </div>
                ) : (
                  <Navigate to="/g" />
                )}
              </PageContainer>
            );
          }}
        </RouteContext.Consumer>
      </ProLayout>
    </div>
  );
};

export default Index;
