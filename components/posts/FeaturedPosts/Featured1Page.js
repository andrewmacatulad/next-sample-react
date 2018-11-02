import React from "react";
import { Card, Button, Image } from "semantic-ui-react";

import { Link } from "../../../routes";

const Featured1Page = ({ featuredPost }) => {
  return (
    <Card>
      {featuredPost.postImageUrl === undefined ? (
        <Image
          style={{ height: "200px" }}
          size="medium"
          alt={featuredPost.postTitle}
          src={
            // "https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
            "https://dnuw5gztyk1mp.cloudfront.net/fit-in/200x200/5b9a42d7b4148835d8fe2ac9/0d23a8a0-b744-11e8-b2fb-d927f81d7807.jpeg"
          }
        />
      ) : (
        <Image
          style={{ height: "300px" }}
          size="medium"
          alt={featuredPost.postTitle}
          src={`https://dnuw5gztyk1mp.cloudfront.net/fit-in/200x200/${
            featuredPost.postImageUrl
          }`}
        />
      )}

      <Card.Content as="h3" textAlign="center">
        <Card.Header>
          <Link
            route="download"
            params={{
              categ: featuredPost.postCategory.slug,
              posttitle: featuredPost.postSlug
            }}
          >
            {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
            {featuredPost.postTitle}
          </Link>
        </Card.Header>
        <Card.Description>
          {featuredPost.postDescription
            ? featuredPost.postDescription.substring(0, 100)
            : ""}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Featured1Page;
