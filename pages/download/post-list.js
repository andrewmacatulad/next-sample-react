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
import LoadingComponent from "../../components/layout/LoadingComponent";

class DownloadList extends Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      // await store.dispatch(getAllPosts());
      await store.dispatch(getAllPostsInCategory(query.categ));
    }
    if (req) {
      Helmet.renderStatic();
    }

    const postsList = store.getState().posts.post;
    // const post = await postsList.find(
    //   post => post.postSlug === query.posttitle
    // );

    // if (!post && res) {
    //   res.statusCode = 404;
    // }
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

    if (typeof document !== "undefined" && posts.length === 0) {
      return <LoadingComponent />;
    } else if (posts.length === 0) {
      return <h2>No Post found for this Category</h2>;
    }

    return <PostList posts={posts} categP={categParams} />;
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts: posts.post };
};
export default connect(
  mapStateToProps,
  { getAllPostsInCategory }
)(DownloadList);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Helmet from "react-helmet";
// import {
//   Segment,
//   Image,
//   Container,
//   Header,
//   Divider,
//   Button,
//   Table
// } from "semantic-ui-react";
// import LoadingComponent from "../../components/layout/LoadingComponent";

// import { Link, Router } from "../../routes";
// import isEmpty from "../../lib/validation/is-empty";
// import {
//   getAllPosts,
//   getAllPostsInCategory
// } from "../../components/posts/Posts/postsAction";
// import { getProfile } from "../../actions";
// import PostList from "../../components/posts/Posts/PostList/PostList";

// class DownloadList extends Component {
//   static async getInitialProps({ req, isServer, query, res, store }) {
//     if (isServer) {
//       // await store.dispatch(getAllPosts());
//       await store.dispatch(getAllPostsInCategory(query.categ));
//     }
//     if (req) {
//       Helmet.renderStatic();
//     }

//     const postsList = store.getState().posts.post;
//     // const post = await postsList.find(
//     //   post => post.postSlug === query.posttitle
//     // );

//     // if (!post && res) {
//     //   res.statusCode = 404;
//     // }
//     return {
//       posts: postsList,
//       categParams: query.categ
//     };
//   }

//   async componentDidMount() {
//     await this.props.getAllPostsInCategory(this.props.categParams);
//   }
//   render() {
//     const { posts, categParams, loading } = this.props;
//     if (loading) {
//       return <LoadingComponent />;
//     }
//     console.log("Client ", posts);
//     if (posts.length === 0) return <h2>No Post found for this Category</h2>;

//     return <PostList posts={posts} categP={categParams} />;
//   }
// }

// const mapStateToProps = ({ posts, async }) => {
//   return { posts: posts.post, loading: async.loading };
// };
// export default connect(
//   mapStateToProps,
//   { getAllPostsInCategory }
// )(DownloadList);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Helmet from "react-helmet";
// import {
//   Segment,
//   Image,
//   Container,
//   Header,
//   Divider,
//   Button,
//   Table
// } from "semantic-ui-react";
// import LoadingComponent from "../../components/layout/LoadingComponent";

// import { Link, Router } from "../../routes";
// import isEmpty from "../../lib/validation/is-empty";
// import {
//   getAllPosts,
//   getAllPostsInCategory
// } from "../../components/posts/Posts/postsAction";
// import { getProfile } from "../../actions";
// import PostList from "../../components/posts/Posts/PostList/PostList";

// class DownloadList extends Component {
//   static async getInitialProps({ req, isServer, query, res, store }) {
//     if (isServer) {
//       // await store.dispatch(getAllPosts());
//       await store.dispatch(getAllPostsInCategory(query.categ));
//     }
//     if (req) {
//       Helmet.renderStatic();
//     }

//     console.log("Server state ", store.getState().posts.post);
//     const postsList = store.getState().posts.post;
//     // const post = await postsList.find(
//     //   post => post.postSlug === query.posttitle
//     // );

//     // if (!post && res) {
//     //   res.statusCode = 404;
//     // }
//     return {
//       posts: postsList,
//       categParams: query.categ
//     };
//   }

//   // async componentDidMount() {
//   //   await this.props.getAllPostsInCategory(this.props.categParams);
//   // }
//   render() {
//     const { posts, categParams, loading } = this.props;
//     console.log(categParams);
//     if (loading) {
//       return <LoadingComponent />;
//     }
//     if (posts.length === 0) return <h2>No Post found for this Category</h2>;

//     return <PostList posts={posts} categP={categParams} />;
//   }
// }

// const mapStateToProps = ({ posts, async }) => {
//   console.log("Client State ", posts.post);
//   return { posts: posts.post, loading: async.loading };
// };
// export default connect(
//   mapStateToProps,
//   { getAllPostsInCategory }
// )(DownloadList);
