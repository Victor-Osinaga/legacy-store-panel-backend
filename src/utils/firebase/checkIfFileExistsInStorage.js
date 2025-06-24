import firebaseInitializer from "./initializeFirebase.js";
import getUrlBase from "../getUrlBase.js";

export default async function checkIfFileExistsInStorage(filename) {
  const bucket = firebaseInitializer.storage().bucket();

  const file = bucket.file(filename);
  const [exists] = await file.exists();
  console.log("exists: ", exists);
  if (!exists) {
    console.log(`El archivo ${filename} NO existe en Firebase Storage`);
    return { exists: false, publicUrl: null };
  }
  console.log(`El archivo ${filename} SI existe en Firebase Storage`);

  const fileLogoLegacy = bucket.file(filename);
  const [url] = await fileLogoLegacy.getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });
  const urlBase = getUrlBase(url);
  // console.log("default URL: ", url);
  console.log("long URL: ", url);
  console.log("short URL: ", urlBase);

  return { exists: true, publicUrl: urlBase };
}
