import { MessageArgsProps, message } from 'antd';

type Mode = 'action' | 'save';

type ResponseConfig = {
  response: { success: boolean } & { [key: string]: any };
  success?: boolean;
  mode?: Mode;
  successText?: string;
  errorText?: string;
  messageConfig?: Partial<MessageArgsProps>;
  onSuccess?: () => void;
  onError?: () => void;
};

const getText = (
  mode: Mode,
  { successText, errorText }: Pick<ResponseConfig, 'successText' | 'errorText'>
) => {
  switch (mode) {
    case 'action':
      return [successText || '操作成功', errorText || '操作失败'];
    case 'save':
      return [successText || '保存成功', errorText || '保存失败'];
    default:
      return [successText || '操作成功', errorText || '操作失败'];
  }
};

export default function useMessage() {
  return (props: ResponseConfig) => {
    const {
      response,
      success = response.success,
      mode = 'action',
      successText = response?.data?.message || response?.data?.content?.message,
      errorText = response?.data?.message || response?.data?.content?.message,
      messageConfig = {},
      onSuccess = () => {},
      onError = () => {}
    } = props;

    const [successTextPlus, errorTextPlus] = getText(mode, {
      successText,
      errorText
    });

    // 成功
    if (success) {
      onSuccess();
      return message.success({
        content: successTextPlus,
        ...messageConfig
      });
    }

    // 失败
    if (onError) {
      onError();
    }
    return message.error({
      content: errorTextPlus,
      ...messageConfig
    });
  };
}
