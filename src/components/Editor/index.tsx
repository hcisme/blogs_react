import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { UploadFunc } from 'react-markdown-editor-lite/cjs/share/var';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadImg } from '@/services/upload';
import { useMdParse, useMessage } from '@/hooks';
import { baseImgUrl } from '@/utils';

type Props = {
  id?: string;
  value?: string;
  onChange?: (text: string) => void;
};

const Index = (props: Props) => {
  const { id, value, onChange = () => {} } = props;
  const messagePro = useMessage();
  const mdParser = useMdParse();

  const handleImageUpload: UploadFunc = async (file, callback) => {
    const { imgUrl, success } = await uploadImg({
      file
    });
    messagePro({
      response: { success },
      successText: '上传成功',
      onSuccess: () => {
        callback(baseImgUrl + imgUrl);
      }
    });
  };

  return (
    <MdEditor
      id={id}
      value={value}
      placeholder="请输入发布文章内容"
      renderHTML={(text) => mdParser.render(text)}
      config={{
        view: {
          menu: true,
          md: true,
          html: true
        }
      }}
      onChange={({ text }) => {
        onChange(text);
      }}
      onImageUpload={handleImageUpload}
    />
  );
};

export default Index;
