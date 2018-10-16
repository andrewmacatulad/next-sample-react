// import "semantic-ui-css/semantic.min.css";
import "./index.css";
import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import Layout from "../components/layout/layout";
import OfflineSupport from "../components/OfflineSupport";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Layout>
              {/* <OfflineSupport /> */}
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      );
    }
  }
);
