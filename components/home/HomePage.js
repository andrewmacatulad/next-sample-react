import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

import { Link } from "../../routes";

const HomePage = ({ post }) => {
  return (
    <Card>
      {post.postImageUrl === undefined ? (
        <Image
          size="medium"
          alt={post.postTitle}
          src={
            // "https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
            "https://dnuw5gztyk1mp.cloudfront.net/fit-in/300x300/5b9a42d7b4148835d8fe2ac9/0d23a8a0-b744-11e8-b2fb-d927f81d7807.jpeg"
          }
        />
      ) : (
        <Image
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
            params={{ categ: post.postCategory.slug, posttitle: post.postSlug }}
          >
            {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
            {post.postTitle}
          </Link>
        </Card.Header>
        <Card.Description>
          {post.postDescription ? post.postDescription.substring(0, 100) : ""}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HomePage;
