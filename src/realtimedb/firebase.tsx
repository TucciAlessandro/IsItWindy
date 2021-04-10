import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
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

export const getToken = () => {
  const messaging = firebase.messaging();

  messaging
    .getToken({ vapidKey: process.env.REACT_APP_PUSHKEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log("request permission");
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export { firebase };
