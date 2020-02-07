import React, { Component, Fragment } from "react";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOut from "../Menus/SignedOut";
import SignedIn from "../Menus/SignedIn";
import { openModal } from "../../Modals/ModalAction";

const actions = {
  openModal
 
};
const mapState = state => ({
  auth: state.firebase.auth,
  profile:state.firebase.profile
});
class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LogInModal");
  };
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth ,profile} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <Image size='mini' src='Assets/logo.png' alt='logo' />
            whatWorks
          </Menu.Item>

          {authenticated && (
            <Fragment>
              <Menu.Item as={NavLink} exact to='/posts' name='Tips' />
              <Menu.Item as={NavLink} exact to='/people' name='people' />
              <Menu.Item as={NavLink} exact to='/Test' name='Test' />
              <Menu.Item>
                <Button
                  as={Link}
                  to='/createPost'
                  floated='right'
                  positive
                  inverted
                  content='Post Tip'
                />
              </Menu.Item>
            </Fragment>
          )}

          {authenticated ? (
            <SignedIn
              auth={auth}
              signOut={this.handleSignOut}
              profile={profile}
            />
          ) : (
            <SignedOut
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    );
  }
}
export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
