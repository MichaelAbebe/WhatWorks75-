import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import { openModal } from "../Modals/ModalAction";

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: true,
  redirectPath: "/posts",
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty ,
  redirectAction: newLoc => dispatch => {
    dispatch(openModal("UnauthModal"));
  }
});
// export const EmailIsVerified = connectedReduxRedirect({
//   wrapperDisplayName: "EmailIsVerified",
//   allowRedirectBack: true,
//   redirectPath: "/",
//   authenticatedSelector: ({ firebase: { auth } }) => auth.emailVerified,
//   redirectAction: newLoc => dispatch => {
//     dispatch(openModal("TestModal"));
//   }
// });
