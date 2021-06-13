import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

firebase.analytics();

const auth = app.auth();
const storage = app.storage();

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase
  .firestore()
  .enablePersistence()
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

const firestore = app.firestore();
const database = {
  recipes: firestore.collection("recipes"),
  users: firestore.collection("users"),
  comments: firestore.collection("comments"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};

export { storage, database, auth };
export default app;
