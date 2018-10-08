import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Router from "next/router";
// import { Link } from "../routes";
import Link from "next/link";
import { getAllLevels } from "../actions";
import redirect from "../lib/redirect";
import require_auth from "../lib/require_auth";

class Test extends Component {
  static getInitialProps({ res, isServer, req }) {
    // if (isServer) {
    //   console.log("ReqUser ", req.user);
    //   if (!req.session.passport) {
    //     console.log("no passport");
    //   } else {
    //     console.log("have passport");
    //     redirect(res, "/");
    //   }
    // }
    if (isServer) {
      if (!req.user) {
        console.log("have passport");
        redirect(res, "/");
      } else {
        console.log("no passport");
      }
    }
  }
  componentDidMount() {
    if (!this.props.profile.isAuthenticated) {
      Router.replace("/");
    }
  }
  render() {
    console.log("Test ", this.props.profile);
    return (
      <div>
        <h1>Test</h1>{" "}
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.profile);
  return { levels: state.levels.levels, profile: state.profile };
};

export default connect(
  mapStateToProps,
  { getAllLevels }
)(Test);
