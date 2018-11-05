import React, { Component } from "react";
import CategoryForm from "../../components/posts/Category/CategoryForm";

import redirect from "../../lib/redirect";
class Category extends Component {
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
        <CategoryForm />
      </div>
    );
  }
}

export default Category;
