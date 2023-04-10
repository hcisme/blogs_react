import React from 'react';
import { UserSwitchOutlined, FileProtectOutlined, FormOutlined } from '@ant-design/icons';
import { compact } from 'lodash';
import router from '@/router';

enum Menu {
  UserManage = '用户管理',
  ArticleManage = '文章管理',
  PublicBlogs = '发布博客'
}

const menuList = [
  {
    name: Menu.UserManage,
    icon: <UserSwitchOutlined />
  },
  {
    name: Menu.ArticleManage,
    icon: <FileProtectOutlined />
  },
  {
    name: Menu.PublicBlogs,
    icon: <FormOutlined />
  }
];

export default compact(
  router
    ?.find((item) => item.children)
    ?.children?.map((item, index) => {
      if (index <= 2) {
        return { ...item, name: menuList[index].name, icon: menuList[index].icon };
      }
    })
);
