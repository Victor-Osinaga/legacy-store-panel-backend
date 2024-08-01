import { decodificar } from "../utils/jwt/decodificar.js";

const isLogged = async (req,res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

        if (!authHeader) throw {msg: "Se requiere autenticacion(auth header)"}
        const token = authHeader.split(' ')[1]  /* dividir la cadena authHeader en un array de dos elementos, 
        separados por un espacio en blanco. El segundo elemento del array (índice 1) se asigna a la variable token. 
        Se asume que authHeader contiene una cadena que comienza con la palabra "Bearer" seguida de un espacio y luego el token de autenticación. 
        Por lo tanto, el segundo elemento del array generado por split() contendrá el token de autenticación. */

        if (!token) throw {msg: "Se requiere autenticacion (token)"}
        // console.log("el token, desde isLogged",token);

        try {
            const objetoOriginal = await decodificar(token)
            req.body.id = await objetoOriginal.data
            // console.log("ID decodificado", objetoOriginal.data);
            next();
            // req.user = objetoOriginal
        } catch (ex) {
            throw {msg: "token invalido"}
        }

        
    } catch (error) {
        console.log("desde mid islogged", error);
        res.status(400).json({status: "failed", data: error.msg})
    }
}

export{
    isLogged
}