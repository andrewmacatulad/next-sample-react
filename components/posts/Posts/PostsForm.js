import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import * as Semantic from "semantic-ui-react";

import SelectInput from "../../common/SelectInput";
import TextInput from "../../common/TextInput";
import TextArea from "../../common/TextArea";

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

class PostForm extends Component {
  onSubmit = async values => {
    console.log(values);
    this.props.createPost(values);
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
          // initialValues={{
          //   // email: profile.email,
          //   // name: profile.name,
          //   // street: profile.address.street,
          //   // city: profile.address.city,
          //   // state: profile.address.state,
          //   // zip: profile.address.zip,
          //   // gender: tagTest
          //   // month: !isEmpty(profile.birthDate)
          //   //   ? profile.birthDate.slice(0, 2)
          //   //   : "01",
          //   // // day: profile.birthDate.slice(4, 6),
          //   // year: profile.birthYear,
          //   // partCopy: this.state.partyC
          // }}
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
              {/* <div>
                <label>Party Copy</label>
                <Field name="partCopy" component={TextArea} />
                <Error name="partCopy" />
              </div> */}
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
