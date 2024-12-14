import { v4 as uuidv4 } from "uuid";

import firebaseInitializer from "../utils/firebase/initializeFirebase.js";
import getUrlBase from "../utils/getUrlBase.js";
import { deleteFolderRecursive } from "../utils/deletePath.js";

export default async function uploadImageProductFirebase(req, res, next) {
  try {
    const folderPath = "/tmp/uploads";
    const bucket = firebaseInitializer.storage().bucket();
    const file = req.file;
    const customId = uuidv4();
    const extention = req.file.originalname.split(".").pop();
    const newFileName = `${customId}.${extention}`;

    await bucket.upload(file.path, {
      destination: newFileName,
      public: true,
    });

    const fileNew = bucket.file(newFileName);
    const [signedUrl] = await fileNew.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    // res.status(200).json({status: "Imagen subida con éxito", signedUrl: signedUrl});

    const urlBase = getUrlBase(signedUrl);
    console.log("url", signedUrl);
    console.log("urlBase", urlBase);

    req.body.image = urlBase;
    req.body.id = customId;

    deleteFolderRecursive(folderPath);
    next();
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      status: "failed",
      msg: "Error en subir imagen del producto",
      detail: error,
    });
  }
}
