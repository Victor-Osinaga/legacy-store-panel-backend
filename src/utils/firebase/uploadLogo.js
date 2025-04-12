import firebaseInitializer from "./initializeFirebase.js";

export default async function uploadLogo(imageBuffer, imageName) {
  try {
    const bucket = firebaseInitializer.storage().bucket();
    const filename = bucket.file(imageName);

    const saved = await filename.save(imageBuffer, {
      public: true,
    });

    const [signedUrl] = await filename.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    console.log("url", signedUrl);

    let newUrlPublic;
    const index = signedUrl.indexOf("?");

    if (index !== -1) {
      newUrlPublic = signedUrl.substring(0, index);
    }

    console.log("Logo subido a firebase", newUrlPublic);

    return newUrlPublic;
  } catch (error) {
    console.log("error uploadBlogImage: ", error);
    throw { msg: "Error al subir el logo a Firebase", status: 400 };
  }
}
