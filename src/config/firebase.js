import firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "react-meals-30cd3.appspot.com",
  messagingSenderId: "265749048724",
  appId: "1:265749048724:web:1b3fbb2ab862cbf9413381",
});

firebase.analytics();

export default firebase;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
