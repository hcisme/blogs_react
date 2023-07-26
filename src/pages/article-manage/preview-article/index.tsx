import React, { CSSProperties, ReactNode, useState } from 'react';
import {
  Avatar,
  Card,
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
import { uniqBy } from 'lodash';
import dayjs from 'dayjs';
import { EyeOutlined, MessageOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { useDebounceFn, useRequest } from 'ahooks';
import { useMessage } from '@/hooks';
import { getArticleInfoById } from '@/services/articles';
import { deleteCommentByCid, getCommentList } from '@/services/comment';
import { getStarList, isStarFn } from '@/services/star';
import { Article } from '@/components';
import { tagsColorList, getLocalStorage, baseImgUrl, UserInfo } from '@/utils';
import { ArticleInfo } from '../edit-article';

interface StarListProps {
  article: ArticleInfo;
  createdAt: string;
  isStar: number;
  star_user: UserInfo;
  updateAt: string;
  _id: string;
}

interface CommentListProps {
  article: string;
  content: string;
  createdAt: string;
  updateAt: string;
  reply_user: UserInfo;
  _id: string;
}

const IconText = ({
  icon,
  text,
  style = {},
  ...rest
}: {
  icon?: ReactNode;
  text?: ReactNode;
  style?: CSSProperties;
  [K: string]: any;
}) => (
  <Space
    style={style}
    {...rest}
  >
    {icon}
    {text}
  </Space>
);

let currentPage = 1;

function Index() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const messagePro = useMessage();
  const [commentList, setCommentList] = useState<CommentListProps[]>([]);
  const { _id } = getLocalStorage('userInfo') || {};
  const color = tagsColorList[Math.floor(Math.random() * tagsColorList.length)];
  // 获取文章信息
  const { loading, data }: { loading: boolean; data?: ArticleInfo[] } = useRequest(async () => {
    const { data = {}, success, message: info } = await getArticleInfoById({ id });
    if (success) {
      return [data];
    }
    message.error(info);
  });

  // 评论列表接口;
  const {
    loading: commentLoading,
    data: { hasMore = false, total: commentTotal = 0 } = {},
    runAsync: getCommentListRunAsync
  } = useRequest(async (current = 1, pageSize = 20) => {
    const {
      data: cList = [],
      hasMore,
      total,
      success,
      message
    }: {
      data: CommentListProps[];
      hasMore?: boolean;
      total?: number;
      success: boolean;
      message: string | any;
    } = await getCommentList({
      aid: id,
      current,
      pageSize
    });
    if (success) {
      setCommentList((prev) => uniqBy([...prev, ...cList], '_id'));
      return { hasMore, total };
    }
    message.error(message);
    return { hasMore: false, total: 0 };
  });

  // 点赞列表接口
  const {
    data: starList = [],
    runAsync: getStarListRunAsync
  }: { data?: StarListProps[]; runAsync: any } = useRequest(async () => {
    const { response } = await getStarList({ id });
    return response;
  });

  const { run: starRun } = useDebounceFn(
    async ({ isStared, starId }) => {
      const response = await isStarFn({ aid: id, starId, isStar: isStared ? 0 : 1 });
      const { message } = response;
      messagePro({
        response,
        errorText: message,
        successText: message,
        onSuccess: () => {
          getStarListRunAsync();
        }
      });
    },
    { wait: 500 }
  );

  const deleteComment = async (cid: string) => {
    const response = await deleteCommentByCid({ cid });
    const { message, success } = response;
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
    <Card>
      <Space
        direction="vertical"
        style={{ width: '100%' }}
        size="large"
      >
        <List<ArticleInfo>
          loading={loading}
          itemLayout="vertical"
          size="large"
          dataSource={data}
          footer={
            <span>
              最后更新时间：
              {`${dayjs(data?.[0].updatedAt).format('YYYY-MM-DD HH:mm:ss')} (${dayjs(
                data?.[0].updatedAt
              ).fromNow()})`}
            </span>
          }
          renderItem={(item) => {
            const { isStar: isStared, _id: starId } =
              starList.find((i) => i?.star_user?._id === _id) || {};
            return (
              <List.Item
                key={item._id}
                actions={[
                  <IconText
                    icon={<EyeOutlined />}
                    text={item.views}
                    key="preview"
                  />,
                  <Tooltip
                    title="点赞👍"
                    key="like"
                  >
                    <IconText
                      icon={<LikeOutlined />}
                      text={starList.length}
                      style={{
                        cursor: 'pointer',
                        color: isStared ? 'red' : ''
                      }}
                      onClick={() => {
                        starRun({ isStared, starId });
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
                  avatar={
                    <Avatar
                      src={baseImgUrl + item?.author?.headImgUrl}
                      size="large"
                    />
                  }
                  title={<a>{item.title}</a>}
                  description={
                    <Space size="large">
                      <span style={{ fontSize: 13 }}>作者：{item?.author?.nickname}</span>
                      <span>
                        创建时间：
                        {`${dayjs(data?.[0].createdAt).format('YYYY-MM-DD HH:mm:ss')} (${dayjs(
                          data?.[0].createdAt
                        ).fromNow()})`}
                      </span>
                      <span>
                        {item?.tag?.split(',')?.map((i) => (
                          <Tag
                            key={i}
                            color={color}
                          >
                            {i}
                          </Tag>
                        ))}
                      </span>
                    </Space>
                  }
                />
                {/* 正文 */}
                {!!item.content && <Article html={item.content} />}
              </List.Item>
            );
          }}
        />

        {/* 评论 */}
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
          endMessage={<Divider plain>没有更多评论了 🤐</Divider>}
          scrollableTarget="preview-article-scrollableDiv"
        >
          <List<CommentListProps>
            loading={commentLoading}
            itemLayout="horizontal"
            dataSource={commentList}
            header="评论"
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip
                    title="点赞👍"
                    key="likeComment"
                  >
                    <IconText
                      icon={<LikeOutlined />}
                      text={0}
                      onClick={() => {}}
                    />
                  </Tooltip>,
                  <Popconfirm
                    title="删除当前评论"
                    key="deleteComment"
                    onConfirm={async () => deleteComment(item._id)}
                  >
                    {item.reply_user?._id === _id && (
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
                  avatar={<Avatar src={baseImgUrl + item.reply_user?.headImgUrl} />}
                  title={<a>{item.reply_user?.nickname}</a>}
                  description={
                    <Space
                      direction="vertical"
                      style={{ width: '100%' }}
                    >
                      <span style={{ fontSize: 12 }}>{dayjs(item.createdAt).fromNow()}</span>
                      <span>{item?.content}</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Space>

      <FloatButton.BackTop />
    </Card>
  );
}

export default Index;
