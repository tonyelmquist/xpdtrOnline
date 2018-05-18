import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const projectsRef = databaseRef.child("projects");

export const usersRef = databaseRef.child("users");

