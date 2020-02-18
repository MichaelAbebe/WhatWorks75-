import { LOGIN_USER, SIGN_OUT_USER, VERIFY_EMAIL } from "./AuthConstants";
import createReducer from "../../app/Common/Util/ReducerUtils";

const initialState = {
  authenticated: false,
  currentUser: null,
  verifyEmail: {
    error: null,
    loading: false
  }
};

const logInUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.creds.email
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null
  };
};
export const verifyEmail = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
  } catch (error) {
    console.log(error.message);
  }
};

export default createReducer(initialState, {
  [LOGIN_USER]: logInUser,
  [SIGN_OUT_USER]: signOutUser,
  [VERIFY_EMAIL]: verifyEmail
});
