import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyBoUg4PygdSj1Iw43ouR54yBJGT4cBj_24',
  authDomain: 'sheets-and-dices.firebaseapp.com',
  databaseURL: 'https://sheets-and-dices.firebaseio.com',
  projectId: 'sheets-and-dices',
  storageBucket: 'sheets-and-dices.appspot.com',
  messagingSenderId: '700673588409',
  appId: '1:700673588409:web:db23610c9a89f3e1',
});

function signIn() {
  return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
}

function signOut() {
  return firebase.auth().signOut();
}

function authChanged(callback) {
  firebase.auth().onAuthStateChanged(callback);
}

export { firebase, signIn, signOut, authChanged };
