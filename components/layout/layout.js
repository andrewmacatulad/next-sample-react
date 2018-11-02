import React, { Component } from "react";
import { connect } from "react-redux";

import { getProfile } from "../../actions";
import { getCategory } from "../posts/Category/categoryAction";
import { getTags } from "../posts/Tags/tagsAction";
import LoadingComponent from "./LoadingComponent";
import NavBar from "../Navbar/NavBar";
import { getAllPosts } from "../posts/Posts/postsAction";
class Layout extends Component {
  async componentDidMount() {
    // this.props.getAllPosts();
    await this.props.getProfile();
    await this.props.getCategory();
    await this.props.getTags();
  }
  render() {
    if (!this.props.profile) {
      return <LoadingComponent />;
    }
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    category: state.category,
    tags: state.tags
  };
};

export default connect(
  mapStateToProps,
  { getProfile, getCategory, getTags, getAllPosts }
)(Layout);
