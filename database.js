const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIREBASE_CREDENTIALS_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

console.log('Firebase config project id: ', serviceAccount.project_id);

module.exports = {
    db,
    admin
};