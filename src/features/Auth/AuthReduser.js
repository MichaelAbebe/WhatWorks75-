import { LOGIN_USER, SIGN_OUT_USER } from "./AuthConstants";
import createReducer from "../../app/Common/Util/ReducerUtils";

const initialState = {
  authenticated: false,
  currentUser: null
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

export default createReducer(initialState, {
  [LOGIN_USER]: logInUser,
  [SIGN_OUT_USER]: signOutUser
});
