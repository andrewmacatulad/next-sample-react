import React from "react";
import Helmet from "react-helmet";
import { Segment, Image, Container, Header, Divider } from "semantic-ui-react";

import { getAllPosts } from "../components/posts/Posts/postsAction";
const posts = [
  { sample: "hello-world", title: "Hello world" },
  { sample: "another-blog-post", title: "Another blog post" },
  { sample: "test", title: "Test" },
  { sample: "testing", title: "Testing" }
];

export default class extends React.Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      await store.dispatch(getAllPosts());
    }
    if (req) {
      Helmet.renderStatic();
    }
    // console.log("Blog ", store.getState().posts.posts);
    // console.log(query.samples);
    const postsList = store.getState().posts.posts;
    // posts.find(post =>
    //   console.log(
    //     "Post",
    //     post.sample,
    //     "Post slug",
    //     post.slug,
    //     "Query",
    //     query.slug,
    //     "Query Sample",
    //     query.sample
    //   )
    // );
    // postsList.find(post => {
    //   console.log(post._id);
    //   5bb77c4e03f510153c498352
    // });
    const post = await postsList.find(post => post.postSlug === query.samples);

    if (!post && res) {
      res.statusCode = 404;
    }

    return { post };
  }

  render() {
    const { post } = this.props;
    console.log(post);

    if (!post) return <h1>Post not found</h1>;

    return (
      <Segment>
        <Container>
          <Helmet>
            <title>{post.postTitle} Download Watch Episodes Free </title>
            <meta name="description" content={`${post.postDescription}`} />
          </Helmet>
          <Header textAlign="center" as="h1">
            {post.postTitle}
          </Header>

          <Image
            centered
            src="https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
            size="medium"
          />

          <Segment>
            <p>{post.postDescription}</p>
          </Segment>
          <Divider />

          <Segment>
            <Header as="h2">{post.postTitle} Downloads:</Header>
            {post.postDownloadLinks.split("\n").map((item, i) => {
              return (
                <p key={i}>
                  {post.postTitle} Episode {i + 1}:{" "}
                  <a href={item} target="_blank">
                    Download
                  </a>
                </p>
              );
            })}
          </Segment>
        </Container>
      </Segment>
    );
  }
}
