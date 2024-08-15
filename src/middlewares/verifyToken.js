import jwt from 'jsonwebtoken'
import config from '../../config.js';

const PRIVATE_KEY = config.private_key_jwt;

export default function verifyToken (req, res, next) {
    const {access_token} = req.cookies;
    console.log("access_token desde midleware verifyToken", access_token);

    if(!access_token){
        return res.status(401).json({ status: "failed", data: "No hay token" })
    }

    jwt.verify(access_token, PRIVATE_KEY, (err, client) => {
        if(err){
            return res.status(403).json( {status: "failed", data: "Token invalido"} )
        }

        req.clientId = client.data
        next()
    })
}