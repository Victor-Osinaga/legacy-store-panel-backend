import jwt from "jsonwebtoken"
import config from "../../../config.js";

const PRIVATE_KEY = config.private_key_jwt;

function decodificar(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(new Error(err));
            } else {
                resolve(decoded);
            }
        });
    });
}

export{
    decodificar
}