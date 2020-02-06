import { toastr } from "react-redux-toastr";
import { createNewPost } from "../../app/Common/Util/Helpers";
import firebase from "../../app/Config/Firebase";
import { FETCH_POSTS } from "./PostConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../Async/AsyncActions";
export const createPost = post => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    const newPost = createNewPost(user, photoURL, post, firestore);
    try {
      let createdPost = await firestore.add("posts", newPost);

      await firestore.set(`post_participant/${createdPost.id}_${user.id}`, {
        postId: createdPost.id,
        userUid: user.uid,
        catalystDate: post.date,

        host: true
      });
      toastr.success("Success!", "Tip has been posted!");
      return createdPost;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
export const updatePost = post => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`posts/${post.id}`, post);
      toastr.success("Success!", "Tip has been updated!");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, postId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the Tip"
    : "This will reactivate the Tip";

  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`posts/${postId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsForDashboard = lastPost => async (dispatch, getState) => {
  // let today = new Date();
  const firestore = firebase.firestore();
  const postsRef = firestore.collection("posts");
  // .where("created", ">=", today);

  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastPost &&
      (await firestore
        .collection("posts")
        .doc(lastPost.id)
        .get());
    let query;

    lastPost
      ? (query = postsRef
          // .where("created", ">=", today)
          .orderBy("created", "desc")
          .startAfter(startAfter)
          .limit(2))
      : (query = query = postsRef
          // .where("date", ">=", today)
          .orderBy("created", "desc")
          .limit(2));

    let querySnap = await query.get();
    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let posts = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let pst = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      posts.push(pst);
    }
    dispatch({ type: FETCH_POSTS, payload: { posts } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
