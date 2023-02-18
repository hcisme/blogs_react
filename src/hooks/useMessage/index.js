import { useCallback } from 'react';
import { message } from 'antd';

const MODE = {
  ACTION: 'action',
  SAVE: 'save',
  LOADING: 'loading'
};

export default function useMessage() {
  const getText = useCallback((mode, { successText, errorText }) => {
    const textArr = [];
    switch (mode) {
      case MODE.ACTION:
        textArr.push(successText || '操作成功', errorText || '操作失败');
        break;
      case MODE.SAVE:
        textArr.push(successText || '保存成功', errorText || '保存失败');
        break;
      default:
        textArr.push(successText || '操作成功', errorText || '操作失败');
        break;
    }
    return textArr;
  }, []);

  return useCallback((options = {}) => {
    const {
      response = {},
      success = response.success,
      mode = MODE.ACTION,
      successText,
      errorText = response?.data?.message || response?.data?.content?.message,
      messageConfig = {},
      onSuccess,
      onError
    } = options;

    const [successTextPlus, errorTextPlus] = getText(mode, {
      successText,
      errorText
    });

    if (mode === MODE.LOADING) {
      return message.loading({
        duration: 0,
        ...messageConfig
      });
    }

    // 成功
    if (success) {
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
      return message.success({
        content: successTextPlus,
        ...messageConfig
      });
    }

    // 失败
    if (typeof onError === 'function') {
      onError();
    }
    return message.error({
      content: errorTextPlus,
      ...messageConfig
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
