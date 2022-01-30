import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAFDSBkAi8PFGF4b8AQ1kGg_g66xVKcIjU",
  authDomain: "vuemusic-29374.firebaseapp.com",
  projectId: "vuemusic-29374",
  storageBucket: "vuemusic-29374.appspot.com",
  appId: "1:193865824689:web:a9c5d1314e2555cc946590"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const usersCollection = db.collection('users')

export { auth, db, usersCollection }