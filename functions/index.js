const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
// const { getFirebase } = require("react-redux-firebase");
admin.initializeApp(functions.config().firebase);

require("dotenv").config();

const { EMAIL, PASS } = process.env;

const db = admin.firestore();
const users = [
  "sreeram.premkumar@gmail.com,michaelamuluneh@gmail.com,seifu.kirubel64@gmail.com,mikmikeluda@gmail.com,jerry.oseghale1@gmail.com,enuase503@gmail.com,henocks@gmail.com,yonathan12muluneh7@gmail.com,zelalemfantahun@gmail.com"
];

// let query = users.orderBy("createdAt");
// let userSnap =  query.get();

exports.sendEmailNotification = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, ctx) => {
    const data = snap.data();

    let authData = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASS
      }
    });
    for (i = 0; i < users.length; i++) {
      authData
        .sendMail({
          from: "info@whatworks.com",
          to: users[i],
          subject: `${data.hostedBy} Posted New Tip`,
          text: "Textpart",
          html: `${data.hostedBy} Tiped ${data.ticker} saying its ${data.forcast}  follow this link to see the tip https://whatworks-a599c.firebaseapp.com/`
        })
        .then(res => console.log("Successfully sent "))

        .catch(err => console.log(err));
    
  }});
  
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
    postId: id
  };
};

exports.createActivity = functions.firestore
  .document("posts/{postId}")
  .onCreate(post => {
    let newPost = post.data();

    const activity = newActivity("newPost", newPost, post.id);

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

exports.updateActivity = functions.firestore
  .document("posts/{postId}")
  .onUpdate((post, context) => {
    let updatedPost = post.after.data();
    let previousPostData = post.before.data();
    console.log({ post });
    console.log({ context });
    console.log({ updatedPost });
    console.log({ previousPostData });

    if (
      !updatedPost.updated ||
      !updatedPost.updated === previousPostData.updated
    )
      return false;

    const activity = newActivity(
      "updatedPost",
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

exports.createPost = functions.firestore.document("");
