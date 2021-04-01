const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const writeResult = await admin
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M")
      .update({isWindy: true});
  res.json({result: "updated"});
  return writeResult;
});

exports.midnight = functions.pubsub
    .schedule("0 12 * * *")
    .onRun(async (context) => {
      const isWindy = await admin
          .firestore()
          .collection("Easykite")
          .doc("zH5WIKrlR152IaQLYa2M")
          .update({isWindy: null});
      const lift = await admin
          .firestore()
          .collection("Easykite")
          .doc("zH5WIKrlR152IaQLYa2M")
          .update({lift: null});
      return {isWindy, lift};
    });
