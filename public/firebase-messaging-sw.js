importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js");

/** @type {ServiceWorkerGlobalScope} */
// let self;

firebase.initializeApp({
  apiKey: "AIzaSyBsPgk_lP39ZLMoMezAVZGM2WTc8e_bItU",
  // apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "easykite-c750e.firebaseapp.com",
  // authDomain: "easykite-c750e.firebaseapp.com",
  databaseURL:
    "https://easykite-c750e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "easykite-c750e",
  storageBucket: "easykite-c750e.appspot.com",
  messagingSenderId: "244819329697",
  appId: "1:244819329697:web:31a918ac92f8cb5cae26e0",
  measurementId: "G-4P713ZQ4M0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
