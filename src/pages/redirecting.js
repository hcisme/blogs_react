import React, { useEffect } from 'react';
import { PageLoading } from '@ant-design/pro-components';
import useToken from '@/hooks/useToken';
import { getLastUserInfo } from '@/services';
import { getLocalStorage } from '@/utils/localStorage';

function Index() {
  const token = useToken();
  const { _id } = getLocalStorage('userInfo') || {};

  const getUserInfo = async () => {
    if (token && _id) {
      const { success, data: { data: { _id: id } = {} } = {} } = await getLastUserInfo();
      if (success && id) {
        window.location.replace('/user-manage');
      } else {
        window.location.replace('/g');
      }
      return;
    } else {
      window.location.replace('/g');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <PageLoading />;
}

export default Index;
