const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();



exports.midnight = functions.pubsub
  .schedule("0 12 * * *")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M")
      .update({ isWindy: null, lift: null });
      
  });
