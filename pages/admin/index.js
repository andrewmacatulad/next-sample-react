import React, { Component } from "react";
import { connect } from "react-redux";
import redirect from "../../lib/redirect";
import Router from "next/router";
import Link from "next/link";

import { Button, Segment } from "semantic-ui-react";

class AdminPage extends Component {
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
  // componentDidMount() {
  //   if (!this.props.profile.user.admin) {
  //     Router.replace("/");
  //   }
  // }
  render() {
    return (
      <Segment>
        <Link href="/admin/post-add">
          <Button>Add Post</Button>
        </Link>

        <Link href="/admin/category-add">
          <Button>Add Category</Button>
        </Link>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
export default AdminPage;
