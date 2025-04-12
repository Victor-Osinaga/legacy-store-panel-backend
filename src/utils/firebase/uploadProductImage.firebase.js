import firebaseInitializer from "./initializeFirebase.js";

export default async function uploadProductImage(imageBuffer, imageName) {
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

    console.log("iamgen subida a firebase", newUrlPublic);

    return newUrlPublic;
  } catch (error) {
    console.log("error uploadBlogImage: ", error);
    throw { msg: "Error al subir la imagen a Firebase", status: 400 };
  }
}
