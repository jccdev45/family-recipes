import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  collection,
  enableIndexedDbPersistence,
  getFirestore,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

getAnalytics(app);

const auth = getAuth(app);
const storage = getStorage(app);

// TODO: PERSISTENCE
initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

const firestore = getFirestore(app);

enableIndexedDbPersistence(firestore).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

const database = {
  recipes: collection(firestore, "recipes"),
  users: collection(firestore, "users"),
  comments: collection(firestore, "comments"),
  getCurrentTimestamp: () => serverTimestamp(),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};

export { storage, firestore, database, auth };
export default app;
