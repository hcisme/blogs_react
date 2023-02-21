import React from 'react';
import { Avatar, List, message, Space, Tag } from 'antd';
import { EyeOutlined, MessageOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.core.css';
// import 'react-quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';
import { getArticleInfoById } from '../../../services/articles';
import CodeHighLight from '../../../component/CodeHighLight';
import { tagsColorList } from '../../../utils/dictionary';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Index() {
  const { id } = useParams();
  const color = tagsColorList[Math.floor(Math.random() * tagsColorList.length)];
  const { loading, data = {} } = useRequest(async () => {
    const { data = {}, success } = await getArticleInfoById({ id });
    if (success) {
      return data.data;
    }
    return message.error(data.message);
  });

  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={[data]}
      footer={<span>最后更新时间：{dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')}</span>}
      renderItem={(item) => {
        return (
          <List.Item
            key={item._id}
            actions={[
              <IconText icon={EyeOutlined} text={item.views} key="preview" />,
              <IconText
                icon={MessageOutlined}
                text={item?.commentTotal?.length}
                key="commentTotal"
              />
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.author?.headImgUrl} />}
              title={<a>{item.title}</a>}
              description={
                <Space size="large">
                  <span style={{ fontSize: 13 }}>作者：{item?.author?.nickname}</span>
                  <span>创建时间：{dayjs(data.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                  <span>
                    {item?.tag?.split(',')?.map((i) => (
                      <Tag key={i} color={color}>
                        {i}
                      </Tag>
                    ))}
                  </span>
                </Space>
              }
            />
            <CodeHighLight html={item.content} />
          </List.Item>
        );
      }}
    />
  );
}

export default Index;
