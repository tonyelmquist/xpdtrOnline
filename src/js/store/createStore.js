import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import makeRootReducer from './reducers'
import firebase from '../utils/initializeFirebase'
// import 'firebase/firestore' // make sure you add this for firestore
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config'
import { updateLocation } from './location'

export default (initialState = {}) => {

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []


  // Initialize Firebase instance and Firestore (optional)
  // firebase.initializeApp(fbConfig)
  // firebase.firestore()

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      // pass firebase or app instance and config
      reactReduxFirebase(firebase, reduxConfig),
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // optional way to listen for auth ready (requires attachAuthIsReady: true)
  // store.firebaseAuthIsReady.then(() => {
  //   console.log('Auth has loaded') // eslint-disable-line no-console
  // })

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime

  return store
}
