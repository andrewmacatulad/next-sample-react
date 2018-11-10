import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "../../../../routes";

const CategoryListItem = ({ category }) => {
  return (
    <List bulleted>
      <Link route="download/post-list" params={{ categ: category.slug }}>
        {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
        <List.Item>{category.name}</List.Item>
      </Link>
    </List>
  );
};

export default CategoryListItem;

// import React from "react";
// import { connect } from "react-redux";

// import { Segment, List } from "semantic-ui-react";
// import { getAllPostsInCategory } from "../../Posts/postsAction";
// import { Link, Router } from "../../../../routes";

// const CategoryListItem = ({ category }) => {
//   return (
//     <List bulleted>
//       <Link
//         route="download/post-list"
//         params={{ categ: category.slug }}
//         onClick={() =>
//           await this.props.getAllPostsInCategory(post.postSlug)
//         }
//       >
//         {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
//         <List.Item>{category.name}</List.Item>
//       </Link>
//     </List>
//   );
// };

// export default connect(
//   null,
//   { getAllPostsInCategory }
// )(CategoryListItem);

// import React from "react";
// import { connect } from "react-redux";

// import { Segment, List } from "semantic-ui-react";
// import { getAllPostsInCategory } from "../../Posts/postsAction";
// import { Link, Router } from "../../../../routes";

// class CategoryListItem extends Component {
//   componentDidMount() {
//     this.props.getAllPostsInCategory(post.postSlug);
//   }
//   render() {
//     const { category } = this.props;
//     return (
//       <List bulleted>
//         <Link route="download/post-list" params={{ categ: category.slug }}>
//           {/* <Menu.Item as="a">Blog Test</Menu.Item> */}
//           <List.Item>{category.name}</List.Item>
//         </Link>
//       </List>
//     );
//   }
// }

// export default connect(
//   null,
//   { getAllPostsInCategory }
// )(CategoryListItem);
