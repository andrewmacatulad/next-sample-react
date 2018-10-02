import { Segment, Button } from "semantic-ui-react";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import axios from "axios";

import Link from "next/link";
import Router from "next/router";
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
      // await Promise.all([
      //   store.dispatch(getAllLevels()),
      //   store.dispatch(getProfile())
      // ]);
      // const url = "http://localhost:3000/api/me";
      // await store.dispatch(getAllLevels());
      // // await store.dispatch(getProfile());
      // const options = {
      //   method: "GET",
      //   headers: req.headers.cookie,
      //   url
      // };
      //await store.dispatch(getAllLevels());
      // await store.dispatch(axios(options));
      //   const res = await fetch("http://localhost:3000/api/me", {
      //     headers: {
      //       cookie: req.headers.cookie
      //     }
      //   });
      //   console.log(res);
    }

    console.log(req.headers.cookie);

    const user = await axios.get("http://localhost:3000/api/me", {
      headers: {
        Accept: "application/json",
        Cookie: req.headers.cookie
      }
    });
    console.log("User", user.data);
    store.dispatch({
      type: GET_PROFILE,
      payload: user.data
    });

    if (req) {
      Helmet.renderStatic();
    }

    // const testState = store.getState();
    // await store.dispatch(getProfile());
    // console.log("Server", isServer);
    // console.log("Pathname", pathname);
    // console.log("Query", query);

    console.log("State", store.getState());

    return { title: "Home", description: "Test lang po" };
  }
  // componentDidMount() {
  //   this.props.getAllLevels();
  // }
  render() {
    const { levels, title, description, profile } = this.props;
    // console.log(levels[0]);
    console.log("Profile", profile);

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
