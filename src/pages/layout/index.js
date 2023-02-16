import React, { useState } from 'react';
import { PageContainer, ProCard, ProConfigProvider, ProLayout } from '@ant-design/pro-components';

const Index = () => {
  const [settings] = useState({
    fixSiderbar: true,
    fixTopBar: true,
    layout: 'mix'
  });

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          prefixCls="my-prefix"
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
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '七妮妮'
          }}
          menuFooterRender={props => {
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
          onMenuHeaderClick={e => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
          route={{
            path: '/h',
            routes: [
              {
                path: '/h/a',
                name: '欢迎',
              }
            ]
          }}
        >
          <PageContainer>
            <ProCard>
              <div>页面</div>
            </ProCard>
          </PageContainer>
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};

export default Index;
