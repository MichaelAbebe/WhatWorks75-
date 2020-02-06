import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import testReducer from "../../features/TestArea/TestReducer";
import postReducer from "../../features/posts/PostReducer";
import ModalREducer from "../../features/Modals/ModalREducer";
import AuthReduser from "../../features/Auth/AuthReduser";
import AsyncReducer from "../../features/Async/AsyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import {firestoreReducer}from 'redux-firestore'
const rootReducer = combineReducers({
  firebase:firebaseReducer,
  firestore:firestoreReducer,
  form: FormReducer,
  test: testReducer,
  posts: postReducer,
  modals: ModalREducer,
  auth: AuthReduser,
  async: AsyncReducer,
  toastr: ToastrReducer
});
export default rootReducer;
