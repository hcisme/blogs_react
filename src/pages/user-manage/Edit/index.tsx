import React, { useRef } from 'react';
import { message } from 'antd';
import { DrawerForm, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { updateUserInfo } from '@/services/user';
import { useMessage } from '@/hooks';
import { UserInfo, getLocalStorage, setLocalStorage } from '@/utils';

interface Props {
  children: React.ReactElement;
  title: React.ReactNode;
  disabled?: boolean;
  record: UserInfo;
  onOk: () => void;
}

type EditInfo = Pick<UserInfo, 'username' | 'nickname' | 'role'>;

const Index = (props: Props) => {
  const { children, title, disabled = false, record, onOk } = props;
  const formRef = useRef<ProFormInstance>();
  const messagePro = useMessage();
  const userInfo = getLocalStorage('userInfo');

  const save = async (values: EditInfo) => {
    const response = await updateUserInfo({
      ...values,
      role: record.role.toString(),
      id: record._id
    });
    const { data = {}, isLogin }: any = response;
    messagePro({
      response,
      onSuccess: () => {
        if (isLogin) {
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
    <DrawerForm<EditInfo>
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
