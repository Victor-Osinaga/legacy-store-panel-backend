import clientAdminService from "../service/client-admin/client-admin.factory.js"

export default async function getClientDb (req, res, next){
    try {
        const clientById = await clientAdminService.getClientAdminById(req.clientId)
        // console.log("clientById desde mid getClientDb", clientById);
        req.proyectName = clientById.proyectName
        next()
    } catch (error) {
        console.log("error desde getclientdb", error);
        return res.status(error.status).json({ status: "failed", data: error.msg })
                
    }

}