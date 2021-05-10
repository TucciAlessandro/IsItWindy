import React, { createContext, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE,
//   authDomain: "easykite-c750e.firebaseapp.com",
//   databaseURL:
//     "https://easykite-c750e-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "easykite-c750e",
//   storageBucket: "easykite-c750e.appspot.com",
//   messagingSenderId: "244819329697",
//   appId: "1:244819329697:web:31a918ac92f8cb5cae26e0",
//   measurementId: "G-4P713ZQ4M0",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const DEFAULT_VALUE = {
  
};

// interface NewsletterContextValue {
//   
// }

// const NewsletterContext = createContext<NewsletterContextValue>(DEFAULT_VALUE);

// const useNewsLetterContext = () => useContext(NewsletterContext);

// interface NewsLetterState {
//   value: boolean;
//   updatedAt: string | null;
// }

// const INITIAL_STATE: NewsLetterState = {
//   value: false,
//   updatedAt: null,
// };

// const NewsLetterContextProvider: React.FC = ({ children }) => {
//   const [newsLetterState, setNewsLetterState] = useLocalStorage(
//     "newsletter",
//     INITIAL_STATE
//   );

//   const contextValue = {
//     newsLetterState,
//     setNewsLetterState,
//   };

//   return (
//     <NewsletterContext.Provider value={contextValue}>
//       {children}
//     </NewsletterContext.Provider>
//   );
// };

// export { useNewsLetterContext, NewsLetterContextProvider };
