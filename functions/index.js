const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, post, id) => {
  return {
    type: type,
    catalystDate: post.date,
    hostedBy: post.hostedBy,
    catalyst: post.catalyst,
    ticker: post.ticker,
    photoURL: post.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: post.hostUid,
    postId: id,
    updated: false
  };
};

exports.createActivity = functions.firestore
  .document("posts/{postId}")
  .onCreate(post => {
    let newPost = post.data();
    console.log(newPost);

    const activity = newActivity("newPost", newPost, post.id);

    console.log(activity);
    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created witth ID:", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity ", err);
      });
  });

exports.cancelActivity = functions.firestore
  .document("posts/{postId}")
  .onUpdate((post, context) => {
    let updatedPost = post.after.data();
    let previousPostData = post.before.data();
    console.log({ post });
    console.log({ context });
    console.log({ updatedPost });
    console.log({ previousPostData });

    if (
      !updatedPost.cancelled ||
      updatedPost.cancelled === previousPostData.cancelled
    )
      return false;

    const activity = newActivity(
      "cancelledPost",
      updatedPost,
      context.params.postId
    );
    console.log({ activity });
    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created witth ID:", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity ", err);
      });
  });
