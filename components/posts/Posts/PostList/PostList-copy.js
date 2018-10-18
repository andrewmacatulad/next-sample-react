import React from "react";

import { Segment } from "semantic-ui-react";
import PostListItem from "./PostListItem-copy";

const PostList = ({ posts }) => {
  return (
    <Segment>
      {posts &&
        posts.map(post => {
          return <PostListItem key={post._id} post={post} />;
        })}
    </Segment>
  );
};

export default PostList;
