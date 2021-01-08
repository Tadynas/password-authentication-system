import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD8gPz3O4WQBxHkBrdko9CEIJn3bVCfXH4",
  authDomain: "password-authentication-c2e77.firebaseapp.com",
  databaseURL: "https://password-authentication-c2e77-default-rtdb.firebaseio.com",
  projectId: "password-authentication-c2e77",
  storageBucket: "password-authentication-c2e77.appspot.com",
  messagingSenderId: "290175775580",
  appId: "1:290175775580:web:dd46aae74fdadc61340799"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
