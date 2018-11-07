import React from "react";
import { connect } from "react-redux";

import { Segment, List } from "semantic-ui-react";

import { Link, Router } from "../../../../routes";

const CategoryListItem = ({ category }) => {
  return (
    <List bulleted>
      <Link
        route="download/post-list"
        params={{ categ: category.slug }}
        prefetch
      >
        {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
        <List.Item>{category.name}</List.Item>
      </Link>
    </List>
  );
};

export default CategoryListItem;
