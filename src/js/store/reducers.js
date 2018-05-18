import { combineReducers } from 'redux'
import {
  firebaseStateReducer as firebase /*,
  firestoreReducer */
} from 'react-redux-firebase'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    // firestore: firestoreReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
