import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";
import UnauthModal from "./UnauthModal";
const modalLookup = {
  TestModal,
  LogInModal,
  RegisterModal,
  UnauthModal
};

const mapState = state => ({
  currentModal: state.modals
});
const ModalManager = ({ currentModal }) => {
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderModal}</span>;
};

export default connect(mapState)(ModalManager);
