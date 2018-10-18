import React from "react";
import Helmet from "react-helmet";
import {
  Segment,
  Image,
  Container,
  Header,
  Divider,
  Button,
  Table
} from "semantic-ui-react";

import { Link, Router } from "../routes";
import isEmpty from "../lib/validation/is-empty";
import {
  getAllPosts,
  getAllPostsInCategory
} from "../components/posts/Posts/postsAction";
import { getProfile } from "../actions";

export default class extends React.Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      // await store.dispatch(getAllPosts());
      await store.dispatch(getProfile());
      await store.dispatch(getAllPostsInCategory(query.categ));
    }
    if (req) {
      Helmet.renderStatic();
    }

    const postsList = store.getState().posts.posts;
    const post = await postsList.find(
      post => post.postSlug === query.posttitle
    );

    if (!post && res) {
      res.statusCode = 404;
    }

    return {
      post,
      params: query.posttitle,
      user: store.getState().profile.user
    };
  }

  render() {
    const { post, user, params } = this.props;
    if (!post) return <h1>Post not found</h1>;

    return <h1>{post.postTitle}</h1>;
  }
}
