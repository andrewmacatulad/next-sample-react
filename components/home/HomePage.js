import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

import { Link } from "../../routes";

const HomePage = ({ post }) => {
  return (
    <Card>
      <Image
        size="medium"
        alt={post.postTitle}
        src={
          post.postImageUrl ||
          // "https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
          "https://s3-ap-southeast-1.amazonaws.com/test-social-123/5b9a42d7b4148835d8fe2ac9/0d23a8a0-b744-11e8-b2fb-d927f81d7807.jpeg"
        }
      />
      <Card.Content as="h3" textAlign="center">
        <Card.Header>
          <Link route="blog" params={{ samples: post.postSlug }}>
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
