import firebaseInitializer from "firebase-admin";
import config from "../../../config.js";

if (!firebaseInitializer.app.length) {
  // Inicializa solo si no está iniciado aún
  firebaseInitializer.initializeApp({
    credential: firebase.credential.cert(config.firebaseAccountKey),
    storageBucket: config.storage_bucket,
  });
} else {
  firebaseInitializer.initializeApp({
    credential: firebaseInitializer.credential.cert(config.firebaseAccountKey),
    storageBucket: config.storage_bucket,
  });
}

export default firebaseInitializer;
