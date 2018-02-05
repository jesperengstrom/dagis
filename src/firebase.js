import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyChq4zPLqHcLG6S5tuAFlDUAGLXvlT2Frw",
  authDomain: "dagis-fd9d3.firebaseapp.com",
  databaseURL: "https://dagis-fd9d3.firebaseio.com",
  projectId: "dagis-fd9d3",
  storageBucket: "",
  messagingSenderId: "803732270453"
};
firebase.initializeApp(config);

export default firebase;