import React, { Component } from "react";
import { Segment, Card, Header, Container } from "semantic-ui-react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import axios from "axios";

import HomePage from "../components/home/HomePage";
import { Link, Router } from "../routes";

// import Link from "next/link";
// import Router from "next/router";
// import { Link, Router } from "../routes";
import { getAllLevels, getProfile, GET_PROFILE } from "../actions";
import Levels from "../components/Levels";
import redirect from "../lib/redirect";
import { getAllPosts } from "../components/posts/Posts/postsAction";

class Home extends Component {
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
      await store.dispatch(getProfile());
      await store.dispatch(getAllLevels());
      await store.dispatch(getAllPosts());
    }

    //console.log(req.headers.cookie);

    if (req) {
      Helmet.renderStatic();
    }

    const postList = store.getState().posts.posts;
    //console.log("State", store.getState().posts.posts);

    return { title: "Home", description: "Test lang po", posts: postList };
  }
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { levels, title, description, profile, posts } = this.props;
    return (
      <Container>
        <Segment>
          <Header as="h2">Korean Drama</Header>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={`${title} - ${description}`} />
          </Helmet>
          <Card.Group itemsPerRow={5} stackable>
            {posts &&
              posts.map(post => {
                return <HomePage key={post._id} post={post} />;
              })}
          </Card.Group>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    levels: state.levels.levels,
    profile: state.profile,
    posts: state.posts.posts
  };
};

export default connect(
  mapStateToProps,
  { getAllLevels, getProfile, getAllPosts }
)(Home);
