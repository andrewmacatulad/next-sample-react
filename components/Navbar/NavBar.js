import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, Router } from "../../routes";
// import Router from "next/router";
// import Link from "next/link";
// import SignedInMenu from "../Menus/SignedInMenu";
import { removeUser } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
  loading: state.async.loading
});
class NavBar extends Component {
  handleSignOut = () => {
    this.props.removeUser();
    Router.replace("/");
  };
  render() {
    // const { auth } = this.props;
    // // const authenticated = auth.isLoaded && !auth.isEmpty;
    // // if (!auth) {
    // //   return <h2>Loading</h2>;
    // // }
    // if (!auth) {
    //   return <LoadingComponent />;
    // }
    return (
      <Menu stackable inverted size="massive">
        <Container>
          <Menu.Item header>
            <Link href="/">
              <Menu.Item as="a">Next Site</Menu.Item>
            </Link>
          </Menu.Item>
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
            <Link href="/test">
              <Menu.Item as="a">Test</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/posts">
              <Menu.Item as="a">Add Post</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/category">
              <Menu.Item as="a">Category</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/tags">
              <Menu.Item as="a">Tags</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/post-list">
              <Menu.Item as="a">Post List</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link route="blog" params={{ samples: "another-blog-post" }}>
              <Menu.Item as="a">Blog Test</Menu.Item>
            </Link>
          </Menu.Item>
          <Menu.Item color="red">
            <img
              src="https://pbs.twimg.com/profile_images/1000303810642837504/LQmBgJmU_400x400.jpg"
              alt=""
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default connect(
  mapStateToProps,
  { removeUser }
)(NavBar);
