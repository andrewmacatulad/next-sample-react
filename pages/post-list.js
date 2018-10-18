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

import { Link, Router } from "../routes";
import isEmpty from "../lib/validation/is-empty";
import {
  getAllPosts,
  getAllPostsInCategory
} from "../components/posts/Posts/postsAction";
import { getProfile } from "../actions";
import PostList from "../components/posts/Posts/PostList/PostList";

export default class extends React.Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      // await store.dispatch(getAllPosts());
      await store.dispatch(getAllPostsInCategory(query.categ));
    }
    if (req) {
      Helmet.renderStatic();
    }

    const postsList = store.getState().posts.posts;
    // const post = await postsList.find(
    //   post => post.postSlug === query.posttitle
    // );

    // if (!post && res) {
    //   res.statusCode = 404;
    // }

    return {
      posts: postsList,
      categParams: query.categ
    };
  }

  render() {
    const { posts, categParams } = this.props;
    if (posts.length === 0) return <h1>Post not found</h1>;

    return <PostList posts={posts} categP={categParams} />;
  }
}

// import React from "react";
// import Helmet from "react-helmet";
// import {
//   Segment,
//   Image,
//   Container,
//   Header,
//   Divider,
//   Button
// } from "semantic-ui-react";

// import { Link, Router } from "../routes";
// import isEmpty from "../lib/validation/is-empty";
// import { getAllPosts } from "../components/posts/Posts/postsAction";
// import { getProfile } from "../actions";

// export default class extends React.Component {
//   static async getInitialProps({ req, isServer, query, res, store }) {
//     if (isServer) {
//       await store.dispatch(getAllPosts());
//       await store.dispatch(getProfile());
//     }
//     if (req) {
//       Helmet.renderStatic();
//     }
//     // console.log("Blog ", store.getState().posts.posts);
//     // console.log(query.samples);
//     const postsList = store.getState().posts.posts;
//     // console.log("Blog Profile ", store.getState().profile);
//     // posts.find(post =>
//     //   console.log(
//     //     "Post",
//     //     post.sample,
//     //     "Post slug",
//     //     post.slug,
//     //     "Query",
//     //     query.slug,
//     //     "Query Sample",
//     //     query.sample
//     //   )
//     // );
//     // postsList.find(post => {
//     //   console.log(post._id);
//     //   5bb77c4e03f510153c498352
//     // });
//     const post = await postsList.find(post => post.postSlug === query.samples);

//     if (!post && res) {
//       res.statusCode = 404;
//     }

//     return { post, params: query.samples, user: store.getState().profile.user };
//   }

//   render() {
//     const { post, user, params } = this.props;
//     // console.log(post);
//     console.log("User blog ", user);
//     console.log(isEmpty(user.admin));
//     if (!post) return <h1>Post not found</h1>;

//     return (
//       <Segment>
//         <Container>
//           <Helmet>
//             <title>{post.postTitle} Download Watch Episodes Free </title>
//             <meta name="description" content={`${post.postDescription}`} />
//           </Helmet>
//           <Button onClick={() => Router.back()}>Back</Button>
//           <Header textAlign="center" as="h1">
//             {post.postTitle}
//           </Header>

//           <Image
//             centered
//             src="https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
//             size="medium"
//           />
//           {user.admin ? (
//             <Link href={`/blog/${params}/edit`}>
//               <Button>Edit</Button>
//             </Link>
//           ) : (
//             ""
//           )}

//           {post.postDescription ? (
//             <Segment>
//               <p>{post.postDescription}</p>
//             </Segment>
//           ) : (
//             ""
//           )}

//           <Divider />

//           <Segment>
//             <Header as="h2">{post.postTitle} Downloads:</Header>
//             {post.postDownloadLinks.split("\n").map((item, i) => {
//               return (
//                 <p key={i}>
//                   {post.postTitle} Episode {i + 1}:{" "}
//                   <a href={item} target="_blank">
//                     Download
//                   </a>
//                 </p>
//               );
//             })}
//           </Segment>
//         </Container>
//       </Segment>
//     );
//   }
// }
