import React from "react";

import { Segment } from "semantic-ui-react";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({ categories }) => {
  return (
    <Segment>
      {categories &&
        categories.map(category => {
          return <CategoryListItem key={category._id} category={category} />;
        })}
    </Segment>
  );
};

export default CategoryList;
