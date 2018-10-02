import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllLevels, getProfile } from "../../actions";
import LoadingComponent from "./LoadingComponent";
class Layout extends Component {
  componentDidMount() {
    this.props.getAllLevels();
    this.props.getProfile();
  }
  render() {
    if (!this.props.profile) {
      return <LoadingComponent />;
    }
    console.log("Layout", this.props.profile);
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = state => {
  return { profile: state.profile, levels: state.levels.levels };
};

export default connect(
  mapStateToProps,
  { getAllLevels, getProfile }
)(Layout);
