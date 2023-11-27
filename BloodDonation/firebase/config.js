import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0YHbfC_t21isTnwA-6aZ7e2FYrcMT_Sg",
  authDomain: "blood-donation-ac142.firebaseapp.com",
  projectId: "blood-donation-ac142",
  storageBucket: "blood-donation-ac142.appspot.com",
  messagingSenderId: "385846849363",
  appId: "1:385846849363:web:3e1863ff8404f389f9fba6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
