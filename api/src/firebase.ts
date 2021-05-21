import * as admin from 'firebase-admin';
import serviceaccount from "./pinkfredor-web-app-2c7d6-firebase-adminsdk-kf19w-b59326a602.json";
admin.initializeApp({
    credential: admin.credential.cert(serviceaccount as any)
});
const firestore = admin.firestore();

const db = firestore
const FieldValue = admin.firestore.FieldValue;

export {db, FieldValue};