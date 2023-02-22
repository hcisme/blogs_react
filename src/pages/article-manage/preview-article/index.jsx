import React from 'react';
import { Avatar, List, message, Space, Tag, Tooltip } from 'antd';
import { EyeOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.core.css';
// import 'react-quill/dist/quill.bubble.css';
import 'quill-emoji/dist/quill-emoji.css';
import useMessage from '../../../hooks/useMessage';
import { getArticleInfoById } from '../../../services/articles';
import { isStarFn } from '../../../services/star';
import CodeHighLight from '../../../component/CodeHighLight';
import { tagsColorList } from '../../../utils/dictionary';
import { getLocalStorage } from '../../../utils/localStorage';

const IconText = ({ icon, text, style = {}, ...rest }) => (
  <Space style={style} {...rest}>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Index() {
  const { id } = useParams();
  const messagePro = useMessage();
  const { _id } = getLocalStorage('userInfo');
  const color = tagsColorList[Math.floor(Math.random() * tagsColorList.length)];
  const {
    loading,
    data = {},
    runAsync: getArticleInfoRunAsync
  } = useRequest(async () => {
    const { data = {}, success } = await getArticleInfoById({ id });
    if (success) {
      return data.data;
    }
    return message.error(data.message);
  });

  const starFn = async ({ isStared, starId }) => {
    const response = await isStarFn({ aid: id, starId, isStar: isStared ? 0 : 1 });
    const { data: { message } = {} } = response;
    messagePro({
      response,
      errorText: message,
      successText: message,
      onSuccess: () => {
        getArticleInfoRunAsync();
      }
    });
  };

  return (
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={[data]}
      footer={<span>最后更新时间：{dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm')}</span>}
      renderItem={(item) => {
        const isStared = !!item?.starList?.find((i) => i.star_user_id === _id)?.isStar;
        const starId = item?.starList?.find((i) => i.star_user_id === _id)?._id;
        return (
          <List.Item
            key={item._id}
            actions={[
              <IconText icon={EyeOutlined} text={item.views} key="preview" />,
              <Tooltip title="点赞👍">
                <IconText
                  icon={LikeOutlined}
                  text={item?.starList?.length}
                  key="like"
                  style={{
                    cursor: 'pointer',
                    color: isStared ? 'red' : ''
                  }}
                  onClick={() => {
                    starFn({ isStared, starId });
                  }}
                />
              </Tooltip>,
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
