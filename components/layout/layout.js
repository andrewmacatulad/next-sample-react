import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllLevels, getProfile } from "../../actions";
import { getCategory } from "../posts/Category/categoryAction";
import { getTags } from "../posts/Tags/tagsAction";
import LoadingComponent from "./LoadingComponent";
import NavBar from "../Navbar/NavBar";
import { getAllPosts } from "../posts/Posts/postsAction";
class Layout extends Component {
  componentDidMount() {
    this.props.getAllLevels();
    this.props.getProfile();
    this.props.getCategory();
    this.props.getTags();
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
    levels: state.levels.levels,
    category: state.category,
    tags: state.tags
  };
};

export default connect(
  mapStateToProps,
  { getAllLevels, getProfile, getCategory, getTags, getAllPosts }
)(Layout);
