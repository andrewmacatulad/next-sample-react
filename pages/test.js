import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Router from "next/router";
// import { Link } from "../routes";
import Link from "next/link";
import redirect from "../lib/redirect";

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
  return { profile: state.profile };
};

export default connect(mapStateToProps)(Test);
