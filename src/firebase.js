import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoMHciR9vla0cGu4CERB9dfNB6NTTjCXU",
  authDomain: "todo-react-338b4.firebaseapp.com",
  databaseURL: "https://todo-react-338b4.firebaseio.com",
  projectId: "todo-react-338b4",
  storageBucket: "todo-react-338b4.appspot.com",
  messagingSenderId: "268809796847",
  appId: "1:268809796847:web:5e8af0ca606f4ee0f6ef1a",
  measurementId: "G-4R3YBWGWXS"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };