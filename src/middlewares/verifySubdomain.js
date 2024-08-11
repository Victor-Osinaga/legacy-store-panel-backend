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

export default async function verifySubdomain(req, res, next) {
    console.log("dentro de verifySubdomain", req.body.subdomain);
    // req.body.subdomain = "asd"
    
    try {
        const response = await fetch(`${api_legacy_admin}/clients/auth/verify-subdomain`,
            {
                headers: { 
                    'Content-Type': 'application/json',
                    'Origin': back_origin_url
                },
                method: 'POST',
                body: JSON.stringify( {subdomain: req.body.subdomain})
            }
        )

        const result = await response.json();
        console.log("desde verifySubdomain service2", result);

        if (!response.ok) {
            // throw {msg: result.data}
            return res.status(response.status).json( {status: result.status, data: result.data} )
        }

        // console.log("response desde veriyToken2", response);
        // console.log("verifyToken : services2", result.data);

        // console.log('informacion recibida de api-legacy', result);
        req.subdomain = result.data.subdomain
        console.log("subdomain desde verifySubdomain", result.data.subdomain);
        next()

    } catch (error) {
        console.log("error desde verifySubdomain : middlewares");
    }
}