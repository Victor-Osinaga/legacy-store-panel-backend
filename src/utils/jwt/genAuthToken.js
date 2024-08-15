import jwt from 'jsonwebtoken'
import config from '../../../config.js'

const PRIVATE_KEY = config.private_key_jwt;

function genAuthToken(data) {
    return new Promise((resolve, reject) => {
        jwt.sign({data}, PRIVATE_KEY, (error, encoded) => {
            if(error) {
                reject(new Error(error))
            }else{
                resolve(encoded)
            }
        })
    })
}

export {
    genAuthToken
}