import "./styles/main.less";
import "../node_modules/semantic-ui-css/semantic.min.css";

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import  { firebaseReducer } from 'react-redux-firebase'
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

import App from './js/containers/App.jsx'

import { reactReduxFirebase } from 'react-redux-firebase'

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyChsVSE1qHHw57ffMuGCYYaGMaVRQQ0f64",
    authDomain: "xpdtronline.firebaseapp.com",
    databaseURL: "https://xpdtronline.firebaseio.com",
    projectId: "xpdtronline",
    storageBucket: "xpdtronline.appspot.com",
    messagingSenderId: "751964377888"
}
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})
// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

const initialState = {}

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)
 
// Setup react-redux so that connect HOC can be used
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
 
render(<Root/>, document.getElementById('root'));
