import firebaseInitializer from "./initializeFirebase.js";
import getUrlBase from "../getUrlBase.js";

export default async function uploadLocalFileAndGetPublicUrl(
  localFilePath,
  filename
) {
  try {
    const bucket = firebaseInitializer.storage().bucket();
    await bucket.upload(localFilePath, {
      destination: filename,
      public: true,
    });
    console.log("Archivo subido exitosamente a Firebase Storage!");
    const fileLogoLegacy = bucket.file(filename);
    const [url] = await fileLogoLegacy.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    const publicUrl = getUrlBase(url);
    console.log("long URL", url);
    console.log("short URL", publicUrl);
    return { uploaded: true, publicUrl };
  } catch (error) {
    console.log("error", error);
    return { uploaded: false, publicUrl: null };
  }
}
