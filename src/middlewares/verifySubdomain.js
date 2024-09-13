import fetch from 'node-fetch';
import config from '../../config.js'
import clientAdminService from '../service/client-admin/client-admin.factory.js';

let allowedOriginPatternFrontStore;
if(config.env == 'dev'){
    allowedOriginPatternFrontStore = /^https?:\/\/([a-z0-9-]+)-legacystore\.localhost(:\d+)?$/;
}else{
    allowedOriginPatternFrontStore = /^https?:\/\/([a-z0-9-]+)-legacystore\.vercel\.app$/;
}

export default async function verifySubdomain(req, res, next) {
    try {
        const origin = req.headers.origin;
        console.log("origin", origin);

        const matchdev = origin.match(allowedOriginPatternFrontStore);

        if (matchdev) {
            const subdomain = matchdev[1]; // 'viktor' en 'http://viktor-legacy-store.localhost:5173'
            console.log("Subdominio detectado STORE MODO DEV:", subdomain);

            const getClientAdminBySubdomain = await clientAdminService.getClientAdminBySubdomain(subdomain)
            console.log("getClientAdminBySubdomain : middleware : verify subdomain", getClientAdminBySubdomain);
            
            
            // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario
            req.proyectName = getClientAdminBySubdomain.proyectName
            req.clientInfo = getClientAdminBySubdomain
            next()
        }else{
            console.log("NO SUBDOMAIN");
            throw {status: 403, msg: "SUBDOMINIO invalido"}
        }
    } catch (error) {
        console.log("error desde verifySubdomain : middlewares");
        res.status(error.status).json( {status: "failed", data: error.msg} )
    }
}