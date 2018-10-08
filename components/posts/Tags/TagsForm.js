import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import Router from "next/router";

import * as Semantic from "semantic-ui-react";
import TextInput from "../../common/TextInput";
import { createTags } from "./tagsAction";

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

class TagsForm extends Component {
  onSubmit = async values => {
    await this.props.createTags(values);
    Router.replace("/tags");
  };

  render() {
    return (
      <Segment>
        <Form
          onSubmit={this.onSubmit}
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
                <label>Tags</label>
                <Field
                  name="name"
                  component={TextInput}
                  type="text"
                  placeholder="Name"
                  validate={required}
                />
                <Error name="name" />
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
  { createTags }
)(TagsForm);
