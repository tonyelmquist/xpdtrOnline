import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyChsVSE1qHHw57ffMuGCYYaGMaVRQQ0f64",
    authDomain: "xpdtronline.firebaseapp.com",
    databaseURL: "https://xpdtronline.firebaseio.com",
    projectId: "xpdtronline",
    storageBucket: "xpdtronline.appspot.com",
    messagingSenderId: "751964377888"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();