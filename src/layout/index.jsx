import React, { useState } from 'react';
import { useNavigate, Link, Outlet, Navigate } from 'react-router-dom';
import { PageContainer, ProLayout, RouteContext } from '@ant-design/pro-components';
import logo from '../assets/images/Octocat.png';
import route from '../router';
import { getLocalStorage } from '../utils/localStorage';
import RightContent from './RightContent';

const Index = () => {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState('/home/user-manage');
  const newRoute = route.find((item) => item.path === '/home').children || [];

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProLayout
        logo={<img src={logo} alt="" />}
        fixSiderbar
        fixedHeader
        layout="mix"
        collapsedButtonRender={false}
        co
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            left: 85,
            bottom: 100,
            height: '303px'
          },
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            bottom: -68,
            right: -45,
            height: '303px'
          },
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '331px'
          }
        ]}
        location={{
          pathname
        }}
        siderMenuType="group"
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        onMenuHeaderClick={() => navigate('/')}
        menuItemRender={(item, defaultDom) => {
          return (
            <Link
              to={item.path}
              onClick={() => {
                setPathname(item.path);
              }}
            >
              {defaultDom}
            </Link>
          );
        }}
        route={{ routes: newRoute }}
        rightContentRender={() => <RightContent />}
      >
        <RouteContext.Consumer>
          {() => {
            console.log(getLocalStorage('token'));
            if (!getLocalStorage('token')) {
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
