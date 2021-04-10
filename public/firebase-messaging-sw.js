import firebase from "firebase/app";
import "firebase/messaging";

let self;

const messaging = firebase.messaging;
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Ciao siamo i bros";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
