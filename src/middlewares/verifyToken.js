import fetch from 'node-fetch';
import config from '../../config.js'

let api_legacy_admin;
let back_origin_url;
if(config.env == 'dev'){
    api_legacy_admin = config.back_legacy_admin_dev
    back_origin_url= config.back_origin_url_dev
}else{
    api_legacy_admin = config.back_legacy_admin_prod
    back_origin_url= config.back_origin_url_prod
}

export default async function verifyToken(req, res, next) {
    const {access_token} = req.cookies;
    console.log("access_token", access_token);
    try {
        const response = await fetch(`${api_legacy_admin}/clients/auth/verify-token`,
            {
                method: 'GET', // o 'POST' dependiendo de tu endpoint
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': `access_token=${access_token}`,
                    'Origin': `${back_origin_url}`
                },
                credentials: 'include', // Importante para incluir las cookies en la solicitud
            }
        )

        const result = await response.json();
        console.log('informacion recibida de api-legacy', result);
        console.log('informacion recibida de api-legacy', response);

        if (!response.ok) {
            // throw {msg: result.data}
            return res.status(response.status).json( {status: result.status, data: result.data} )
        }

        // console.log("response desde veriyToken2", response);
        // console.log("desde verifyToken service2", result);
        // console.log("verifyToken : services2", result.data);

        req.subdomain = result.data.subdomain
        next()

    } catch (error) {
        console.log("error desde verifyToken : middlewares", error);
    }
}