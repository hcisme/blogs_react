import React from 'react';
import { useNavigate, Link, Outlet, Navigate } from 'react-router-dom';
import { PageContainer, ProLayout, RouteContext } from '@ant-design/pro-components';
import route from '@/router';
import logo from '@/assets/images/Octocat.png';
import { getLocalStorage } from '@/utils';
import { ESign } from '@/components';
import RightContent from './RightContent';
import MenuFooter from './MenuFooter';

const Index = () => {
  const navigate = useNavigate();
  const newRoutingTable =
    route
      ?.filter((item) => item.children)
      ?.filter((i) => i.icon)
      ?.map(({ path, name, icon }) => ({ path, name, icon })) || [];

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        title="博客系统"
        logo={
          <img
            src={logo}
            alt=""
          />
        }
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
        menuFooterRender={(props) => !props.collapsed && <MenuFooter />}
        menuItemRender={(item, defaultDom) => {
          return <Link to={item.path}>{defaultDom}</Link>;
        }}
        route={{ routes: newRoutingTable }}
      >
        <RouteContext.Consumer>
          {() => {
            return (
              <PageContainer
                id="preview-article-scrollableDiv"
                style={{
                  overflow: 'auto'
                }}
                pageHeaderRender={false}
              >
                {getLocalStorage('token') ? (
                  <>
                    <Outlet />
                    <ESign />
                  </>
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
