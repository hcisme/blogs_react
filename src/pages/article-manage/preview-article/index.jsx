import React, { useState } from 'react';
import {
  Avatar,
  Divider,
  FloatButton,
  List,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Tag,
  Tooltip
} from 'antd';
import { EyeOutlined, MessageOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import 'quill-emoji/dist/quill-emoji.css';
import useMessage from '../../../hooks/useMessage';
import { getArticleInfoById } from '../../../services/articles';
import { deleteCommentByCid, getCommentList } from '../../../services/comment';
import { isStarFn } from '../../../services/star';
import CodeHighLight from '../../../component/CodeHighLight';
import { tagsColorList } from '../../../utils/dictionary';
import { getLocalStorage } from '../../../utils/localStorage';
import { uniqBy } from 'lodash';

const IconText = ({ icon, text, style = {}, ...rest }) => (
  <Space style={style} {...rest}>
    {icon}
    {text}
  </Space>
);

let currentPage = 1;

function Index() {
  const { id } = useParams();
  const messagePro = useMessage();
  const [commentList, setCommentList] = useState([]);
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
    message.error(data.message);
  });

  const {
    loading: commentLoading,
    data: { hasMore, total: commentTotal = 0 } = {},
    runAsync: getCommentListRunAsync
  } = useRequest(async (current = 1, pageSize = 20) => {
    const { data: { data: cList = [], hasMore, total } = {}, success } = await getCommentList({
      aid: id,
      current,
      pageSize
    });
    if (success) {
      setCommentList((prev) => uniqBy([...prev, ...cList], '_id'));
      return { hasMore, total };
    }
    message.error(data.message);
  }, {});

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

  const deleteComment = async (cid) => {
    const response = await deleteCommentByCid({ cid });
    const { data: { message } = {}, success } = response;
    messagePro({
      response,
      errorText: message,
      successText: message,
      onSuccess: async () => {
        setCommentList([]);
        await getCommentListRunAsync();
      }
    });
    return success;
  };

  // 触底加载更多评论
  const loadMoreComments = () => {
    if (commentLoading) {
      return;
    }
    getCommentListRunAsync((currentPage += 1));
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
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
                  <IconText icon={<EyeOutlined />} text={item.views} key="preview" />,
                  <Tooltip title="点赞👍">
                    <IconText
                      icon={<LikeOutlined />}
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
                    icon={<MessageOutlined />}
                    text={item?.commentTotal?.length}
                    key="commentTotal"
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item?.author?.headImgUrl} size="large" />}
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
        <InfiniteScroll
          dataLength={commentTotal}
          next={loadMoreComments}
          hasMore={hasMore}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1
              }}
              active
            />
          }
          endMessage={<Divider plain>没有更多了 🤐</Divider>}
          scrollableTarget="preview-article-scrollableDiv"
        >
          <List
            loading={commentLoading}
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip title="点赞👍">
                    <IconText
                      icon={<LikeOutlined />}
                      text={0}
                      key="likeComment"
                      onClick={() => {}}
                    />
                  </Tooltip>,
                  <Popconfirm title="删除当前评论" onConfirm={async () => deleteComment(item._id)}>
                    {item.reply_user_id._id === _id && (
                      <IconText
                        icon={
                          <a style={{ color: 'red' }}>
                            <DeleteOutlined />
                          </a>
                        }
                        key="delete"
                      />
                    )}
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.reply_user_id?.headImgUrl} />}
                  title={<a href="https://ant.design">{item.reply_user_id?.nickname}</a>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Space>

      <FloatButton.BackTop />
    </>
  );
}

export default Index;
