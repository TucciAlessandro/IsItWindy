import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

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

interface FirebaseContextValue {
  getFirebaseInstance: () => firebase.app.App;
  getToken: () => void;
  isAuthenticated: boolean;
}

const DEFAULT_VALUE: FirebaseContextValue = {
  getFirebaseInstance: () => {
    return {} as firebase.app.App;
  },
  getToken: () => {},
  isAuthenticated: false,
};

const FirebaseContext = createContext<FirebaseContextValue>(DEFAULT_VALUE);

const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const getFirebaseInstance = () => {
    let firebaseIstance;
    if (!firebase.apps.length) {
      firebaseIstance = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseIstance = firebase.app();
    }

    firebaseIstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return firebaseIstance;
  };

  useEffect(() => {
    const unsubscribe = getFirebaseInstance()
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setIsAuth(true);
          return;
        }
        setIsAuth(false);
      });

    return unsubscribe;
  }, []);

  const getToken = () => {
    const messaging = firebase.messaging.isSupported()
      ? getFirebaseInstance().messaging()
      : null;
    console.log(messaging);
    messaging &&
      messaging
        .getToken({ vapidKey: process.env.REACT_APP_PUSHKEY })
        .then((currentToken) => {
          if (currentToken) {
            console.log("request permission");
            console.log("token is:", currentToken);
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

  const contextValue: FirebaseContextValue = {
    getFirebaseInstance,
    getToken,
    isAuthenticated: isAuth,
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { useFirebaseContext, FirebaseContextProvider };
