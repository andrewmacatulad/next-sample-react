import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import Router from "next/router";
// import { Link } from "../routes";
import Link from "next/link";
import { Segment, Image, Card, Container } from "semantic-ui-react";
import Carousel from "nuka-carousel";
// import Slider from "react-slick";
import { getAllPosts } from "../components/posts/Posts/postsAction";

class Test extends Component {
  static async getInitialProps({ res, isServer, req, store }) {
    if (isServer) {
      await store.dispatch(getAllPosts());
      // await store.dispatch(getAllPostsInCategory("korean-drama"));
    }
    const postList = store.getState().posts.posts;
    return { posts: postList };
  }
  render() {
    const { posts } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    if (posts.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <Segment>
          <Carousel autoplay={true} autoplayInterval={3000}>
            {posts.map(post => {
              return post.postImageUrl === undefined ? (
                <Image
                  size="medium"
                  centered
                  alt={post.postTitle}
                  src={
                    // "https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
                    "https://dnuw5gztyk1mp.cloudfront.net/fit-in/300x300/5b9a42d7b4148835d8fe2ac9/0d23a8a0-b744-11e8-b2fb-d927f81d7807.jpeg"
                  }
                />
              ) : (
                <Image
                  size="medium"
                  centered
                  alt={post.postTitle}
                  src={`https://dnuw5gztyk1mp.cloudfront.net/fit-in/300x300/${
                    post.postImageUrl
                  }`}
                />
              );
            })}
          </Carousel>
        </Segment>

        <Segment>
          <Card.Group itemsPerRow={5}>
            {posts.map(post => {
              return (
                <Card>
                  {post.postImageUrl === undefined ? (
                    <Image
                      className="test"
                      size="medium"
                      alt={post.postTitle}
                      src={
                        // "https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
                        "https://dnuw5gztyk1mp.cloudfront.net/fit-in/300x300/5b9a42d7b4148835d8fe2ac9/0d23a8a0-b744-11e8-b2fb-d927f81d7807.jpeg"
                      }
                    />
                  ) : (
                    <Image
                      className="test"
                      size="medium"
                      alt={post.postTitle}
                      src={`https://dnuw5gztyk1mp.cloudfront.net/fit-in/300x300/${
                        post.postImageUrl
                      }`}
                    />
                  )}

                  <Card.Content as="h3" textAlign="center">
                    <Card.Header>
                      <Link
                        route="download"
                        params={{
                          categ: post.postCategory.slug,
                          posttitle: post.postSlug
                        }}
                      >
                        {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
                        {post.postTitle}
                      </Link>
                    </Card.Header>
                    <Card.Description>
                      {post.postDescription
                        ? post.postDescription.substring(0, 100)
                        : ""}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </Segment>
      </Container>
    );
  }
}

export default Test;
