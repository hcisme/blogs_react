import React from 'react';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { Upload, UploadFile } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { baseImgUrl } from '@/utils';

interface Props {
  id: string;
  value?: UploadFile<any>[];
  text: string;
  onChange: Function;

  /**
   * 裁切图片工具的参数
   */
  imgCropProps?: ImgCropProps;
}

//定义图片转base64方法
function customRequest(option: UploadRequestOption, onChange: Function) {
  const reader = new FileReader();
  reader.readAsDataURL(option.file as Blob);
  reader.onloadend = function (e: ProgressEvent<FileReader>) {
    onChange([
      {
        file: option.file,
        status: 'done',
        response: '',
        thumbUrl: e?.target?.result
      }
    ]);
  };
}

const onPreview = async (file: UploadFile & { [key: string]: any }) => {
  let src = file.url as string;
  if (file.file) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const Index = (props: Props) => {
  const { id, value = [], text, imgCropProps, onChange } = props;

  return (
    <span id={id}>
      <ImgCrop
        rotate
        grid
        shape="rect"
        aspect={1 / 1}
        modalTitle="修剪图片"
        modalOk="确定"
        modalCancel="取消"
        {...imgCropProps}
      >
        <Upload
          maxCount={1}
          accept=".png,.jpg,.jpeg,.gif"
          listType="picture-card"
          fileList={value?.[0] ? [{ ...value[0], url: baseImgUrl + value[0].url }] : []}
          customRequest={(option) => {
            customRequest(option, onChange);
          }}
          // showUploadList
          onRemove={() => onChange()}
          onPreview={onPreview}
        >
          {text}
        </Upload>
      </ImgCrop>
    </span>
  );
};

export default Index;
