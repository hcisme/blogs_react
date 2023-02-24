import { useRef } from 'react';
import { message } from 'antd';
import { DrawerForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { updateUserInfo } from '@/services/user';
import useMessage from '@/hooks/useMessage';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

const Index = (props) => {
  const { children, title, disabled = false, record = {}, onOk } = props;
  const formRef = useRef({});
  const messagePro = useMessage({});
  const userInfo = getLocalStorage('userInfo');

  const save = async (values) => {
    const response = await updateUserInfo({ ...values, id: record._id });
    const { data: { data = {} } = {} } = response;
    messagePro({
      response,
      onSuccess: () => {
        if (data.isLogin) {
          setLocalStorage('userInfo', { ...userInfo, ...data });
          message.success('身份信息已更新');
          window.location.reload();
        } else {
          onOk();
        }
      }
    });
    return response.success;
  };

  return (
    <DrawerForm
      title={title}
      width={400}
      trigger={children}
      formRef={formRef}
      initialValues={record}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true
      }}
      onFinish={save}
      disabled={disabled}
    >
      <ProFormText label="用户名" name="username" rules={[{ required: true }]} />
      <ProFormText label="昵称" name="nickname" rules={[{ required: true }]} />
      <ProFormRadio.Group
        label="角色"
        name="role"
        rules={[{ required: true }]}
        options={[
          { label: '超级管理员', value: 1 },
          { label: '普通用户', value: 2 }
        ]}
      />
    </DrawerForm>
  );
};

export default Index;
