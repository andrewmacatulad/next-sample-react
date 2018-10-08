import { Segment, Button } from "semantic-ui-react";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import axios from "axios";

import { Link, Router } from "../routes";

// import Link from "next/link";
// import Router from "next/router";
// import { Link, Router } from "../routes";
import { getAllLevels, getProfile, GET_PROFILE } from "../actions";
import Levels from "../components/Levels";
import redirect from "../lib/redirect";

class HomePage extends Component {
  static async getInitialProps({ res, store, isServer, pathname, query, req }) {
    // if (isServer) {
    //   // await Promise.all([
    //   //   store.dispatch(getAllLevels()),
    //   //   store.dispatch(getProfile())
    //   // ]);
    //   await store.dispatch(getAllLevels());
    //   await store.dispatch(getProfile());
    // }
    if (isServer) {
      store.dispatch(getProfile());
      store.dispatch(getAllLevels());
    }

    //console.log(req.headers.cookie);

    if (req) {
      Helmet.renderStatic();
    }

    console.log("State", store.getState());

    return { title: "Home", description: "Test lang po" };
  }
  // componentDidMount() {
  //   this.props.getAllLevels();
  // }
  render() {
    const { levels, title, description, profile } = this.props;
    // console.log(levels[0]);
    console.log("Profile", profile.user);

    return (
      <div>
        {/* <Helmet
          title={`${title} | Hello Home`}
          meta={[{ property: "og:title", content: title }]}
        /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={`${title} - ${description}`} />
        </Helmet>
        <h1>Levels</h1>
        <Button
          as="a"
          href="http://localhost:3000/auth/google"
          type="button"
          fluid
          color="google plus"
        >
          Sign in to Google
        </Button>

        <Button as="a" href="http://localhost:3000/api/logout">
          Sign out
        </Button>
        <Link href="/test">
          <Button>Go to test page</Button>
        </Link>
        <Button onClick={() => Router.push("/test")}>Test</Button>
        <Segment>
          <Levels levels={levels} />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { levels: state.levels.levels, profile: state.profile };
};

export default connect(
  mapStateToProps,
  { getAllLevels, getProfile }
)(HomePage);
