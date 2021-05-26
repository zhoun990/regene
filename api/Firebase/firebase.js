import * as firebase from "firebase";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";

import "firebase/functions";

// Initialize Firebase App

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.app().functions("asia-northeast1");

export const loginWithEmail = (email, password) =>
	auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
	auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);
export const increment = (i) => firebase.firestore.FieldValue.increment(i);
export default firebase;
