import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

import notifyReducer from "./reducers/notifyReducer";

const firebaseConfig = {
  apiKey: "AIzaSyCN88vFbYIK74qZcIujSF-iXsSbW5Di39M",
  authDomain: "react-bf1a7.firebaseapp.com",
  databaseURL: "https://react-bf1a7.firebaseio.com",
  projectId: "react-bf1a7",
  storageBucket: "react-bf1a7.appspot.com",
  messagingSenderId: "1053249984018"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
