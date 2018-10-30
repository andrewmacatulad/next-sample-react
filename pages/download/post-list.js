import React, { Component } from "react";
import { connect } from "react-redux";
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

import { Link, Router } from "../../routes";
import isEmpty from "../../lib/validation/is-empty";
import {
  getAllPosts,
  getAllPostsInCategory
} from "../../components/posts/Posts/postsAction";
import { getProfile } from "../../actions";
import PostList from "../../components/posts/Posts/PostList/PostList";

class DownloadList extends Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      // await store.dispatch(getAllPosts());
      await store.dispatch(getAllPostsInCategory(query.categ));
    }
    if (req) {
      Helmet.renderStatic();
    }

    const postsList = store.getState().posts.posts;
    // const post = await postsList.find(
    //   post => post.postSlug === query.posttitle
    // );

    // if (!post && res) {
    //   res.statusCode = 404;
    // }
    console.log(query.categ);
    console.log("Post List ", store.getState());
    return {
      posts: postsList,
      categParams: query.categ
    };
  }

  componentDidMount() {
    this.props.getAllPostsInCategory(this.props.categParams);
  }
  render() {
    const { posts, categParams } = this.props;

    if (posts.length === 0) return <h2>No Post found for this Category</h2>;

    return <PostList posts={posts} categP={categParams} />;
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts: posts.posts };
};
export default connect(
  mapStateToProps,
  { getAllPostsInCategory }
)(DownloadList);
