import admin from "firebase-admin";
import { envs } from "./envs.config.js";

const { firebase } = envs;

let db, auth;

const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          project_id: firebase.projectId,
          private_key_id: firebase.privateKeyId,
          private_key: firebase.privateKey?.replace(/\\n/g, "\n"),
          client_email: firebase.clientEmail,
          client_id: firebase.clientId,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url: firebase.certUrl,
        }),
        projectId: firebase.projectId,
      });

      console.log("🔥 Firebase Admin SDK inicializado correctamente");
    } catch (error) {
      console.error("❌ Error inicializando Firebase:", error.message);
      process.exit(1);
    }
  }

  db = admin.firestore();
  auth = admin.auth();

  db.settings({
    ignoreUndefinedProperties: true,
    merge: true,
  });

  return { db, auth };
};

const { db: firestore, auth: firebaseAuth } = initializeFirebase();

export { firestore as db, firebaseAuth as auth };
export default admin;
