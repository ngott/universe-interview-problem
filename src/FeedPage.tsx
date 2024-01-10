import { InView } from "react-intersection-observer";
import { Tooltip } from "react-tooltip";
import { PostData } from "./util";

interface PostListData {
  data: Array<PostData>;
  page: number;
  handleScrollup: (pageNum: number) => void;
}

function FeedPage({ data, page, handleScrollup }: PostListData) {
  const userToolTip = (post: PostData) => (
    <div className="profile-tool-tip">
      <img
        className="profile-img"
        width={40}
        height={40}
        src={post.profilePic}
      />
      <div className="user-name">{post.userName}</div>
      <div className="post-text">{post.description}</div>
    </div>
  );

  return (
    <>
      <InView
        onChange={() => {
          handleScrollup(page);
        }}
      ></InView>
      {data &&
        data.map((post) => {
          return (
            <div className="element-container">
              <div className="profile">
                <img
                  data-tooltip-id={`profile-img-${post.userId}`}
                  className="profile-img"
                  width={40}
                  height={40}
                  src={post.profilePic}
                />
                <Tooltip
                  id={`profile-img-${post.userId}`}
                  children={userToolTip(post)}
                />
              </div>
              <div className="post-body">
                <div className="user-name">{post.userName}</div>
                <div className="post-text">{post.post}</div>
                <img className="img" width={514} src={post.postImage} />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default FeedPage;
