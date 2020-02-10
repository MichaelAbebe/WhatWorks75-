import React, { Component, Fragment } from "react";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOut from "../Menus/SignedOut";
import SignedIn from "../Menus/SignedIn";
import { openModal } from "../../Modals/ModalAction";
import { toastr } from "react-redux-toastr";

const actions = {
  openModal
};
const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});
class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LogInModal");
  };
  handleRegister = () => {
    const message =
      "This webite is a community of traders who shares ideas and researches.Investors are always reminded that before making any investment, you should do your own proper due dillgence on any time directly or indirectly mentioned in this web-site.Investors should also consider seeking advice from a broker or financial adviser before making any investment decisions. Any information mentioned in this web-site was not verified,and should be relied on as a suggestion. All tips and other statments, unless specified are based on the user's personal understanding/research and may subjet to future changes.";
    try {
      toastr.confirm(message, {
        onOk: async () => await this.props.openModal("RegisterModal")
      });
    } catch (error) {
      console.log(error);
    }

    // this.props.openModal("TestModal");

    // this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth, profile } = this.props;
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
