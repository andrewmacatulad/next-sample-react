import React from "react";
import Helmet from "react-helmet";
import {
  Segment,
  Image,
  Container,
  Header,
  Divider,
  Button,
  Table
} from "semantic-ui-react";

import { Link, Router } from "../../routes";
import isEmpty from "../../lib/validation/is-empty";
import {
  getAllPosts,
  getAllPostsInCategory
} from "../../components/posts/Posts/postsAction";
import { getProfile } from "../../actions";

export default class extends React.Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      await store.dispatch(getAllPosts());
      await store.dispatch(getProfile());
      //await store.dispatch(getAllPostsInCategory(query.categ));
    }
    if (req) {
      Helmet.renderStatic();
    }

    console.log("TEst Post", query);
    const postsList = store.getState().posts.posts;
    const post = await postsList.find(
      post => post.postSlug === query.posttitle
    );

    if (!post && res) {
      res.statusCode = 404;
    }

    return {
      post,
      params: query.posttitle,
      user: store.getState().profile.user
    };
  }

  render() {
    const { post, user, params } = this.props;
    if (!post) return <h1>Post not found</h1>;

    const HdLinks = [];
    const StreamLinks = [];
    console.log(post.postHdDownloadLinks !== undefined);
    if (post.postHdDownloadLinks !== undefined) {
      post.postHdDownloadLinks.split("\n").map((item, i) => {
        // return (
        //   <p key={i}>
        //     {post.postTitle} Episode {i + 1}:{" "}
        //     <a href={item} target="_blank">
        //       Download
        //     </a>
        //   </p>
        // );
        HdLinks.push(item);
      });
    }

    if (post.postStreamLinks !== undefined) {
      post.postStreamLinks.split("\n").map((item, i) => {
        // return (
        //   <p key={i}>
        //     {post.postTitle} Episode {i + 1}:{" "}
        //     <a href={item} target="_blank">
        //       Download
        //     </a>
        //   </p>
        // );
        StreamLinks.push(item);
      });
    }

    return (
      <Segment>
        <Container>
          <Helmet>
            <title>{post.postTitle} Download Watch Episodes Free </title>
            <meta name="description" content={`${post.postDescription}`} />
          </Helmet>
          <Button onClick={() => Router.back()}>Back</Button>
          <Header textAlign="center" as="h1">
            {post.postTitle}
          </Header>
          {post.postImageUrl === undefined ? (
            <Image
              alt={post.postTitle}
              centered
              src="https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
            />
          ) : (
            <Image
              alt={post.postTitle}
              centered
              src={`https://dnuw5gztyk1mp.cloudfront.net/fit-in/800x800/${
                post.postImageUrl
              }`}
            />
          )}

          {user.admin ? (
            <Link href={`/blog/${params}/edit`}>
              <Button>Edit</Button>
            </Link>
          ) : (
            ""
          )}

          {post.postDescription ? (
            <Segment>
              <p>{post.postDescription}</p>
            </Segment>
          ) : (
            ""
          )}

          <Divider />

          <Table>
            {/* <Header as="h2">{post.postTitle} Downloads:</Header> */}
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                {post.postHdDownloadLinks ? (
                  <Table.HeaderCell>HD Download</Table.HeaderCell>
                ) : (
                  ""
                )}
                {post.postDownloadLinks ? (
                  <Table.HeaderCell>Download</Table.HeaderCell>
                ) : (
                  ""
                )}
                {post.postStreamLinks ? (
                  <Table.HeaderCell>Watch Online</Table.HeaderCell>
                ) : (
                  ""
                )}
                {post.postSubsLinks ? (
                  <Table.HeaderCell>English Subs</Table.HeaderCell>
                ) : (
                  ""
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {post.postDownloadLinks.split("\n").map((item, i) => {
                return (
                  <p key={i}>
                    {post.postTitle} Episode {i + 1}:{" "}
                    <a href={item} target="_blank">
                      Download
                    </a>
                  </p>
                );
              })} */}
              {/* <Table.Row> */}
              {post.postDownloadLinks.split("\n").map((item, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      {post.postTitle} Episode {i + 1}
                    </Table.Cell>
                    <Table.Cell>
                      <a href={item} target="_blank">
                        Download
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      {typeof HdLinks[i] === "undefined" ? (
                        ""
                      ) : (
                        <a href={HdLinks[i]} target="_blank">
                          Watch
                        </a>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {typeof StreamLinks[i] === "undefined" ? (
                        ""
                      ) : (
                        <a href={StreamLinks[i]} target="_blank">
                          Watch
                        </a>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    );
  }
}
