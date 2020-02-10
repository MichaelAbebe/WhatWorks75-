import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../Modals/ModalAction";
import { toastr } from "react-redux-toastr";

export const logIn = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    await createdUser.user.updateProfile({ displayName: user.displayName });
    let newUser = {
      uid: firebase.auth().currentUser.uid,
      displayName: user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firebase
      .firestore()
      .collection("users")
      .doc(newUser.uid)
      .set(newUser);
    dispatch(closeModal());
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup"
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    await dispatch(reset("account"));
    toastr.success("Sucess", "Your password has been updated");
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
};
