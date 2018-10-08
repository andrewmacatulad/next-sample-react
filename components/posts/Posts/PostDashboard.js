import React, { Component } from "react";
import { connect } from "react-redux";
import PostList from "./PostList/PostList";

import { getAllPosts } from "./postsAction";
import LoadingComponent from "../../layout/LoadingComponent";

class PostDashboard extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts } = this.props;
    console.log(posts.posts.length);
    if (posts.posts.length === 0) {
      return <LoadingComponent />;
    }
    return (
      <div>
        <PostList posts={posts.posts} />
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts };
};

export default connect(
  mapStateToProps,
  { getAllPosts }
)(PostDashboard);
