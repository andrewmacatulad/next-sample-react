import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
// import { Link } from "../routes";
import Link from "next/link";
import { getAllLevels } from "../actions";
import redirect from "../lib/redirect";

class Test extends Component {
  static getInitialProps({ res, isServer, req }) {
    console.log("Server", isServer);

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
  render() {
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
  return { levels: state.levels.levels };
};

export default connect(
  mapStateToProps,
  { getAllLevels }
)(Test);
