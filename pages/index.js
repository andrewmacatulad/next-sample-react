import React, { Component } from "react";
import { Segment, Card, Header, Container } from "semantic-ui-react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import HomePage from "../components/home/HomePage";

import {
  getAllPosts,
  getFeaturedPostsOne,
  getFeaturedPostsTwo,
  getFeaturedPostsThree
} from "../components/posts/Posts/postsAction";
import { getCategory } from "../components/posts/Category/categoryAction";
import LoadingComponent from "../components/layout/LoadingComponent";
class Home extends Component {
  static async getInitialProps({ res, store, isServer, pathname, query, req }) {
    // if (isServer) {
    //   // await Promise.all([
    //   //   store.dispatch(getProfile())
    //   // ]);
    //   await store.dispatch(getProfile());
    // }
    if (isServer) {
      await store.dispatch(getCategory());
      await Promise.all([
        store.dispatch(
          getFeaturedPostsOne(store.getState().category.category[1]._id)
        ),
        store.dispatch(
          getFeaturedPostsTwo(store.getState().category.category[2]._id)
        ),
        store.dispatch(
          getFeaturedPostsThree(store.getState().category.category[0]._id)
        )
      ]);

      // await store.dispatch(getAllPostsInCategory("korean-drama"));
    }

    if (req) {
      Helmet.renderStatic();
    }

    // const postList = store.getState().posts.posts;
    //console.log("State", store.getState().posts.posts);

    return {
      title: "Home",
      description: "Test lang po",
      // posts: postList,
      featured1: store.getState().posts.featured_posts1,
      featured2: store.getState().posts.featured_posts2,
      featured3: store.getState().posts.featured_posts3
    };
  }
  async componentDidMount() {
    const {
      getFeaturedPostsOne,
      getFeaturedPostsTwo,
      getFeaturedPostsThree,
      category
    } = this.props;

    await getFeaturedPostsOne(category[1]._id);
    await getFeaturedPostsTwo(category[2]._id);
    await getFeaturedPostsThree(category[0]._id);
  }
  render() {
    const {
      title,
      description,
      featured1,
      featured2,
      featured3,
      loading
    } = this.props;

    if (
      typeof document !== "undefined" &&
      loading &&
      featured1.length === 0 &&
      featured2 === 0 &&
      featured3 === 0
    ) {
      return <LoadingComponent />;
    }

    // if (loading) {
    //   return <LoadingComponent />;
    // }
    return (
      <Container>
        {/* <Segment>
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
        </Segment> */}
        <Segment>
          <Header as="h2">Korean Drama</Header>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={`${title} - ${description}`} />
          </Helmet>
          <Card.Group itemsPerRow={5} stackable>
            {featured3 &&
              featured3.map(featured3 => {
                return <HomePage key={featured3._id} post={featured3} />;
              })}
          </Card.Group>
        </Segment>
        <Segment>
          <Header as="h2">Korean Movies</Header>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={`${title} - ${description}`} />
          </Helmet>
          <Card.Group itemsPerRow={5} stackable>
            {featured1 &&
              featured1.map(featured1 => {
                return <HomePage key={featured1._id} post={featured1} />;
              })}
          </Card.Group>
        </Segment>

        <Segment>
          <Header as="h2">Japanese Drama</Header>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={`${title} - ${description}`} />
          </Helmet>
          <Card.Group itemsPerRow={5} stackable>
            {featured2 &&
              featured2.map(featured2 => {
                return <HomePage key={featured2._id} post={featured2} />;
              })}
          </Card.Group>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.category.category,
    featured1: state.posts.featured_posts1,
    featured2: state.posts.featured_posts2,
    featured3: state.posts.featured_posts3,
    loading: state.async.loading
  };
};

export default connect(
  mapStateToProps,
  {
    getFeaturedPostsOne,
    getFeaturedPostsTwo,
    getFeaturedPostsThree,
    getCategory
  }
)(Home);
