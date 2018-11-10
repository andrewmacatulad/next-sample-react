import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import Head from "next/head";
import { Link, Router } from "../../routes";
// import Router from "next/router";
// import Link from "next/link";
// import SignedInMenu from "../Menus/SignedInMenu";
import { removeUser } from "../../actions";
import isEmpty from "../../lib/validation/is-empty";

const mapStateToProps = state => {
  return {
    user: state.profile,
    loading: state.async.loading
  };
};
class NavBar extends Component {
  handleSignOut = () => {
    this.props.removeUser();
    Router.replace("/");
  };
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("service worker registered."))
        .catch(err => console.dir(err));
    }
  }
  render() {
    const { user } = this.props;
    // // const authenticated = auth.isLoaded && !auth.isEmpty;
    // // if (!auth) {
    // //   return <h2>Loading</h2>;
    // // }
    // if (!auth) {
    //   return <LoadingComponent />;
    // }
    // console.log("Nav ", user.isAuthenticated);
    return (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#302ecd" />
        </Head>
        <Menu stackable inverted size="massive">
          <Container>
            <Menu.Item as="h1" header>
              <Link href="/" prefetch>
                <Menu.Item as="a">Next Site</Menu.Item>
              </Link>
            </Menu.Item>

            {!user.isAuthenticated ? (
              <Menu.Item>
                <Link href="/auth/google">
                  <Menu.Item as="a">Logged In</Menu.Item>
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item onClick={this.handleSignOut} name="Signout" />
            )}

            {/* {auth.user && auth.user ? (
            <SignedInMenu auth={auth.user} signOut={this.handleSignOut} />
          ) : (
            <Menu.Item as={NavLink} to="/login" name="Login" />
          )}
          <Menu.Item as={NavLink} to="/profile" name="Profile" />
          {auth.user && auth.user.level >= 10 ? (
            <Menu.Item as={NavLink} to="/equipment" name="Equipment" />
          ) : (
            <Menu.Item disabled name="Equipment" />
          )} */}
            <Menu.Item>
              <Link href="/test" prefetch>
                <Menu.Item as="a">Test</Menu.Item>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/admin/post-add" prefetch>
                <Menu.Item as="a">Add Post</Menu.Item>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/category" prefetch>
                <Menu.Item as="a">Category</Menu.Item>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/tags" prefetch>
                <Menu.Item as="a">Tags</Menu.Item>
              </Link>
            </Menu.Item>
            <Menu.Item color="red">
              <img src="/static/no-image.png" alt="" />
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { removeUser }
)(NavBar);
