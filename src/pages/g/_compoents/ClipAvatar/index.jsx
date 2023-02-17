import React from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

//定义图片转base64方法
function customRequest({ option, onChange }) {
  const reader = new FileReader();
  reader.readAsDataURL(option.file);
  reader.onloadend = function (e) {
    onChange([
      {
        file: option.file,
        status: 'done',
        response: '',
        thumbUrl: e.target.result
      }
    ]);
    if (e && e.target && e.target.result) {
      option.onSuccess();
    }
  };
}

const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const Index = (props) => {
  const { id, value = [], onChange } = props;

  return (
    <span id={id}>
      <ImgCrop
        rotate
        grid
        shape="round"
        modalTitle="修剪图片"
        modalOk="确定"
        modalCancel="取消"
      >
        <Upload
          maxCount={1}
          accept=".png,.jpg,.jpeg,.gif"
          listType="picture-card"
          fileList={value}
          customRequest={(option) => {
            customRequest({ option, onChange });
          }}
          onPreview={onPreview}
        >
          上传头像
        </Upload>
      </ImgCrop>
    </span>
  );
};

export default Index;
