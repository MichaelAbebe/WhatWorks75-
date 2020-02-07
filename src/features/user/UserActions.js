import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../Async/AsyncActions";
import cuid from "cuid";
import firebase from "../../app/Config/Firebase";
import { FETCH_POSTS } from "../posts/PostConstants";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Your Profile has been updated ");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();

  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    let uploadedFile = await firebase.uploadFile(path, file, null, options);

    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

    let userDoc = await firestore.get(`users/${user.uid}`);

    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({ photoURL: downloadURL });
      await user.updateProfile({ photoURL: downloadURL });
    }
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      { name: imageName, url: downloadURL }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem Deleting photo");
  }
};
export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};

export const getUserPosts = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());

  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let postsRef = firestore.collection("post_participant");
  let query;

  switch (activeTab) {
    case 1: // past events
      query = postsRef
        .where("userUid", "==", userUid)
        .where("catalystDate", "<=", today)
        .orderBy("catalystDate", "desc");

      break;
    case 2: // future events
      query = postsRef
        .where("userUid", "==", userUid)
        .where("catalystDate", ">=", today)
        .orderBy("catalystDate");

      break;
    case 3: // hosted events
      query = postsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("catalystDate", "desc");
      break;
    default:
      query = postsRef.where("userUid", "==", userUid).orderBy("catalystDate");
      break;
  }

  try {
    let querySnap = await query.get();
    let posts = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let pst = await firestore
        .collection("posts")
        .doc(querySnap.docs[i].data().postId)
        .get();
      posts.push({ ...pst.data(), id: pst.id });
    }

    dispatch({ type: FETCH_POSTS, payload: { posts } });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const participatingInPost = post => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const participant = {
    participating: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/Assets/user.png",
    displayName: profile.displayName,
    host: false
  };
  try {
    await firestore.update(`posts/${post.id}`, {
      [`participants.${user.uid}`]: participant
    });
    await firestore.set(`post_participant/${post.id}_${user.uid}`, {
      postId: post.id,
      userUid: user.uid,
      catalystDate: post.date,
      host: false
    });
    toastr.success("Success", "You are now participating in this Tip ");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem joining Tip ");
  }
};
export const cancelParticipatingInPost = post => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`posts/${post.id}`, {
      [`participants.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`post_participant/${post.id}_${user.uid}`);
    toastr.success("Success", "You are not participating in this Tip ");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem canceling");
  }
};
