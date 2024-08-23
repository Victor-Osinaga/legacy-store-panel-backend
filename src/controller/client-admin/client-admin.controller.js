import clientAdminService from "../../service/client-admin/client-admin.factory.js"
import { genAuthToken } from "../../utils/jwt/genAuthToken.js"

const createClientAdmin = async (req, res) => {
    try {
        const createdClientAdmin = await clientAdminService.createClientAdmin(req.body)
        res.status(200).json({ status: 'ok', data: createdClientAdmin })
    } catch (error) {
        res.status(error.status).json({ status: 'failed', data: error.msg })
    }
}

// LOGIN
const loginClientAdmin = async (req, res) => {
    try {
        const clientLoged = await clientAdminService.loginClientAdmin(req.body)
        const token = await genAuthToken(clientLoged.id)
        res.cookie('access_token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'None',

        })
        res.status(200).json({ status: "ok", data: clientLoged })
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: "failed", data: error.msg })
    }
}


const getClientAdminById = async (req, res) => {
    try {
        console.log("desde controller", req.clientId);
        const client = await clientAdminService.getClientAdminById(req.clientId)
        res.status(200).json({ status: "okkk", data: client })
    } catch (error) {
        res.status(error.status).json({ status: "failed", data: error.msg })
    }
}

const logoutClientAdmin = async (req, res) => {
    res.cookie("access_token", "", {
        expires: new Date(0),
        secure: true,
        httpOnly: true,
        sameSite: 'None'
    })
    res.status(200).json({ status: "ok", data: "Logout successful" })
}

export {
    createClientAdmin,
    loginClientAdmin,
    getClientAdminById,
    logoutClientAdmin
}