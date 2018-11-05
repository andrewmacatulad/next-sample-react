import React, { Component } from "react";
import PostsForm from "../../components/posts/Posts/PostsForm";

import redirect from "../../lib/redirect";
class Posts extends Component {
  static async getInitialProps({ res, isServer, req }) {
    if (isServer) {
      if (req.user === undefined) {
        // console.log("Please login in");
        redirect(res, "/");
      } else if (!req.user.admin) {
        // console.log("Only Admin can access this page");
        redirect(res, "/");
      }
    }
  }
  render() {
    return (
      <div>
        <PostsForm />
      </div>
    );
  }
}

export default Posts;
