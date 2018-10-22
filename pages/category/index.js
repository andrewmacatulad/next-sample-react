import React, { Component } from "react";
import Helmet from "react-helmet";
import keys from "../../config/keys";
import { getCategory } from "../../components/posts/Category/categoryAction";
import CategoryList from "../../components/posts/Category/CategoryList/CategoryList";

class Category extends Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      await store.dispatch(getCategory());
    }
    if (req) {
      Helmet.renderStatic();
    }

    console.log("Category Query", query);
    return { categories: store.getState().category.category };
  }
  render() {
    const { categories } = this.props;
    console.log("REDIRECT ", keys.redirectDomain);
    return (
      <div>
        <CategoryList categories={categories} />
      </div>
    );
  }
}

export default Category;
