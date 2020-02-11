import React, { Component } from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal, openModal } from "./ModalAction";
import { toastr } from "react-redux-toastr";

const actions = { closeModal, openModal };

class UnauthModal extends Component {
  handleCloseModal = () => {
    // if (this.props.location.pathname.includes("/posts/")) {
    //   this.props.closeModal();
    // } else {
    this.props.closeModal();
    this.props.history.goBack();
    // }
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

  render() {
    const { openModal } = this.props;
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>You need to be signed in to do that!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Please either login or register to see this page</p>
            <Button.Group widths={4}>
              <Button
                fluid
                color='teal'
                onClick={() => openModal("LogInModal")}
              >
                Login
              </Button>
              <Button.Or />
              <Button fluid positive onClick={this.handleRegister}>
                Register
              </Button>
            </Button.Group>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <p>Or click cancel to continue as a guest</p>
              <Button onClick={this.handleCloseModal}>Cancel</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(null, actions)(UnauthModal));
