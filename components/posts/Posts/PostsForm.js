import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import * as Semantic from "semantic-ui-react";

import SelectInput from "../../common/SelectInput";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";
import CheckInput from "../../common/CheckInput";
import { Router } from "../../../routes";

import LoadingComponent from "../../layout/LoadingComponent";
import isEmpty from "../../../lib/validation/is-empty";
import { createPost } from "./postsAction";

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

const types = [
  { text: "Series", value: "series" },
  { text: "Movie", value: "movie" },
  { text: "Special/Ova", value: "special" }
];

const downloadTypes = [
  { text: "Episodes", value: "episodes" },
  { text: "Part", value: "part" },
  { text: "Solo", value: "solo" }
];
class PostForm extends Component {
  onSubmit = async values => {
    console.log(values);
    // this.props.createPost(values);
    // Router.replace("/");
  };
  render() {
    const { categories, tags } = this.props;

    const tagsList = [];
    const categoryList = [];

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

    // if (!profile.address) {
    //   return <LoadingComponent />;
    // }
    // console.log(profile.gender);
    return (
      <Segment>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{
            postType: "series",
            postDownloadType: "episodes"
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
                <label>File</label>
                <Field
                  name="postFile"
                  component={TextInput}
                  type="file"
                  placeholder="File"
                  accept="image/*"
                />
                <Error name="postFile" />
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
                <Field
                  fluid
                  name="postType"
                  options={types}
                  component={SelectInput}
                  validate={required}
                  width={9}
                />
                <Field
                  fluid
                  name="postDownloadType"
                  options={downloadTypes}
                  component={SelectInput}
                  validate={required}
                  width={9}
                />
              </SemanticForm.Group>
              <div>
                <label>Subtitle</label>
                <Field
                  name="postSubtitle"
                  component={TextInput}
                  type="text"
                  placeholder="Subtitle"
                  validate={required}
                />
                <Error name="postSubtitle" />
              </div>
              <div>
                <label>Download Links</label>
                <Field
                  name="postDownloadLinks"
                  component={TextArea}
                  placeholder="Please enter the download Links"
                />
                <Error name="postDownloadLinks" />
              </div>
              <div>
                <label>HD Download Links</label>
                <Field
                  name="postHdDownloadLinks"
                  component={TextArea}
                  placeholder="Please enter the HD download Links"
                />
                <Error name="postHdDownloadLinks" />
              </div>
              <div>
                <label>Stream Links</label>
                <Field
                  name="postStreamLinks"
                  component={TextArea}
                  placeholder="Please enter the stream Links"
                />
                <Error name="postStreamLinks" />
              </div>
              <div>
                <label>Subtitle Links</label>
                <Field
                  name="postSubsLinks"
                  component={TextArea}
                  placeholder="Please enter the subtitles Links"
                />
                <Error name="postSubsLinks" />
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
        {/* <Segment>
          {profile.accessToken.split("\n").map((item, i) => {
            return (
              <p key={i}>
                Episode {i + 1}: <a href={item}>{item}</a>
              </p>
            );
          })}
        </Segment> */}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { categories: state.category, tags: state.tags };
};

export default connect(
  mapStateToProps,
  { createPost }
)(PostForm);
