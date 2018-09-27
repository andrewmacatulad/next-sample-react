import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { getAllLevels } from "../actions";
import Levels from "../components/Levels";

class HomePage extends Component {
  static getInitialProps({ store, req }) {
    store.dispatch(getAllLevels());
    if (req) {
      Helmet.renderStatic();
    }
    return { title: "Home", description: "Test lang po" };
  }
  componentDidMount() {
    this.props.getAllLevels();
  }
  render() {
    const { levels, title, description } = this.props;
    return (
      <div>
        {/* <Helmet
          title={`${title} | Hello Home`}
          meta={[{ property: "og:title", content: title }]}
        /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={`${title} - ${description}`} />
        </Helmet>
        <h1>Levels</h1>
        <Segment>
          <Levels levels={levels} />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { levels: state.levels.levels };
};

export default connect(
  mapStateToProps,
  { getAllLevels }
)(HomePage);
