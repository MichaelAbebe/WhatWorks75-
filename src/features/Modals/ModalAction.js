import { MODAL_OPEN, MODAL_CLOSE } from "./ModalConstants";

export const openModal = (modalType, modalPeops) => {
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalPeops
    }
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE
  };
};
