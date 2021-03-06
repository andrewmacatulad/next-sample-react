import React from "react";

import { Segment } from "semantic-ui-react";
import PostListItem from "./PostListItem";

const PostList = ({ posts, categP }) => {
  return (
    <Segment>
      {posts &&
        posts.map(post => {
          return <PostListItem key={post._id} post={post} categP={categP} />;
        })}
    </Segment>
  );
};

export default PostList;
