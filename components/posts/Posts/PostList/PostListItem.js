import React from "react";
import { connect } from "react-redux";
import { Segment, List } from "semantic-ui-react";

import { Link, Router } from "../../../../routes";

const PostListItem = ({ post, categP }) => {
  return (
    <List bulleted>
      <Link
        route="download"
        params={{ categ: categP, posttitle: post.postSlug }}
      >
        {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
        <List.Item>{post.postTitle}</List.Item>
      </Link>
    </List>
  );
};

export default PostListItem;
