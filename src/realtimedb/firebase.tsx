import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsPgk_lP39ZLMoMezAVZGM2WTc8e_bItU",
  authDomain: "easykite-c750e.firebaseapp.com",
  databaseURL:
    "https://easykite-c750e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easykite-c750e",
  storageBucket: "easykite-c750e.appspot.com",
  messagingSenderId: "244819329697",
  appId: "1:244819329697:web:31a918ac92f8cb5cae26e0",
  measurementId: "G-4P713ZQ4M0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().collection('Easykite')

// const db = firebase.database().ref("Easykite");

// export const isWindy = db.get().then((asd) => console.log(asd));

export { firebase };
