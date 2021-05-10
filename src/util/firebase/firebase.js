import firebase from "firebase/app";
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

const auth = app.auth()

const firestore = app.firestore();
const database = {
	recipes: firestore.collection("recipes"),
	getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
	formatDoc: (doc) => {
		return { id: doc.id, ...doc.data() };
	},
};

const storage = app.storage();

export { storage, database, auth };
export default app;
