import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import * as Semantic from "semantic-ui-react";

import { Router } from "../../routes";
import SelectInput from "../../components/common/SelectInput";
import TextInput from "../../components/common/TextInput";
import TextArea from "../../components/common/TextArea";
import {
  getAllPosts,
  editPost
} from "../../components/posts/Posts/postsAction";
import { getProfile } from "../../actions";
import { getCategory } from "../../components/posts/Category/categoryAction";
import { getTags } from "../../components/posts/Tags/tagsAction";

const { Form: SemanticForm, Segment, Button } = Semantic;

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const required = value => (value ? undefined : "Required");

class PostEdit extends Component {
  static async getInitialProps({ req, isServer, query, res, store }) {
    if (isServer) {
      await store.dispatch(getAllPosts());
      await store.dispatch(getProfile());
      await store.dispatch(getCategory());
      await store.dispatch(getTags());
    }

    console.log(query);
    const postsList = store.getState().posts.posts;

    const post = await postsList.find(post => post.postSlug === query.samples);

    if (!post && res) {
      res.statusCode = 404;
    }
    // categories: state.category, tags: state.tags
    // console.log("Query ", query.samples);
    // console.log("Edit post", post);

    const { profile, category, tags } = store.getState();
    return { post, user: profile.user, categories: category, tags };
  }
  onSubmit = async values => {
    await this.props.editPost(values, this.props.post._id);
    Router.replace("/");
  };

  render() {
    const { post, user, categories, tags } = this.props;
    const tagsList = [];
    const categoryList = [];

    if (!post) return <h1>Post not found</h1>;
    if (!user.admin)
      return <h1>You didn't have privilege to access the page</h1>;

    console.log(post._id);
    tags.tags.map(tag => {
      return tagsList.push({ key: tag.name, value: tag._id, text: tag.name });
    });

    categories.category.map(category => {
      return categoryList.push({
        key: category.name,
        value: category._id,
        text: category.name
      });
    });
    return (
      <Segment>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            postTitle: post.postTitle,
            postDescription: post.postDescription,
            postTags: post.postTags,
            postCategory: post.postCategory,
            postDownloadLinks: post.postDownloadLinks
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            invalid
          }) => (
            <SemanticForm onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <Field
                  name="postTitle"
                  component={TextInput}
                  type="text"
                  placeholder="Title"
                  validate={required}
                />
                <Error name="postTitle" />
              </div>
              <div>
                <label>Description</label>
                <Field
                  name="postDescription"
                  component={TextArea}
                  placeholder="Please enter the description of the post"
                />
                <Error name="postDescription" />
              </div>
              <label>Category and Tags</label>
              <SemanticForm.Group>
                <label>Tags</label>
                <Field
                  fluid
                  name="postTags"
                  multiple
                  options={tagsList}
                  component={SelectInput}
                  width={9}
                />
                <label>Category</label>
                <Field
                  fluid
                  name="postCategory"
                  options={categoryList}
                  component={SelectInput}
                  validate={required}
                  width={9}
                />
              </SemanticForm.Group>
              <div>
                <label>Download Links</label>
                <Field
                  name="postDownloadLinks"
                  component={TextArea}
                  placeholder="Please enter the download Links"
                />
                <Error name="postDownloadLinks" />
              </div>

              <div className="buttons">
                <Button
                  positive
                  type="submit"
                  disabled={submitting || pristine || invalid}
                >
                  Submit
                </Button>
                <Button
                  negative
                  type="button"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </div>
            </SemanticForm>
          )}
        />
      </Segment>
    );
  }
}
export default connect(
  null,
  { editPost }
)(PostEdit);
