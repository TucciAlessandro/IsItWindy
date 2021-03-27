import * as functions from "firebase-functions";
import {firebase} from "./../../src/realtimedb/firebase";


export const updateStatus = functions.https.onRequest((request, response) => {
  const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
  isWindyDb.update({isWindy: null});
  isWindyDb.update({lift: null});
  response.send("Updated");
});
