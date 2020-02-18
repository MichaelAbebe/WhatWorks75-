import React from "react";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./ModalAction";
import { connect } from "react-redux";

const actions = {
  closeModal
};

const TestModal = ({ closeModal, handleSignOut }) => {
  return (
    <Modal closeIcon='close' open={true} onClose={closeModal}>
      <Modal.Header>Verify Email</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Please Verify email! A link for to verify has been sent to the email
            you have provided please follow the link{" "}
          </p>
        </Modal.Description>
        <Modal.Description></Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
export default connect(null, actions)(TestModal);
