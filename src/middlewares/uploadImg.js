import config from '../../config.js';
import firebase from 'firebase-admin'
import { deleteFolderRecursive } from '../utils/deletePath.js';

const folderPath = "./uploads";

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebaseAccountKey),
    storageBucket: config.storage_bucket
});

const upl = async (req, res, next)=>{
    const file = await req.file;
    const bucket = firebase.storage().bucket();
    const newFileName = `${Date.now()}-${req.file.originalname}`;

    bucket.upload(file.path, {
        destination: newFileName,
        public: true
    }).then(() => {
        const fileNew = bucket.file(newFileName);

        fileNew.getSignedUrl({
            action: "read",
            expires: "03-09-2491"
        }).then(signedUrls => {
            const url = signedUrls[0];
            // res.status(200).json({status: "Imagen subida con éxito", url: url});
            req.body.image = url
            deleteFolderRecursive(folderPath);
            next()
        }).catch(err => {
            console.error(`Error al obtener la URL: ${err}`);
        });

        // console.log(`Carpeta ${folderPath} borrada`);
        // console.log(`Carpeta ${folderPath} creada`);
    }).catch(error => {
        res.status(500).send(error);
    }); 
}

export{
    upl
}