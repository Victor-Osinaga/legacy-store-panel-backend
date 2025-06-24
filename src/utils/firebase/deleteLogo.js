import firebaseInitializer from "./initializeFirebase.js";

export default async function deleteLogo(filename) {
  try {
    const bucket = firebaseInitializer.storage().bucket();
    const file = bucket.file(filename);

    const [exists] = await file.exists();

    if (!exists) {
      console.log("Logo no encontrado:", filename);
      return true; // Continuar aunque no exista
    }

    await file.delete();
    console.log("Imagen eliminada con éxito:", filename);

    return true;
  } catch (error) {
    console.log("error deleteLogo: ", error);
    return false; // No lanzar, solo avisar a la función principal
    //   console.log("error deleteLogo: ", error);
    //   throw { msg: "Error al eliminar el logo a Firebase", status: 400 };
  }
}
