import clientAdminService from "../../service/client-admin/client-admin.factory.js";
import { genAuthToken } from "../../utils/jwt/genAuthToken.js";

const createClientAdmin = async (req, res) => {
  try {
    const createdClientAdmin = await clientAdminService.createClientAdmin(
      req.body
    );
    res.status(200).json({ status: "ok", data: createdClientAdmin });
  } catch (error) {
    console.log("error desde controller", error);

    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

// LOGIN
const loginClientAdmin = async (req, res) => {
  try {
    const clientLoged = await clientAdminService.loginClientAdmin(req.body);
    const token = await genAuthToken(clientLoged.id);
    // la cookie y el jwt tienen el mismo tiempo de expiracion, revisar si se puede hacer un refresh token cambiando la duracion de la cookie a un tiempo corto y el jwy a un tiempo de vida mas largo
    res.cookie("access_token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.status(200).json({ status: "ok", data: clientLoged });
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

const getClientAdminById = async (req, res) => {
  try {
    console.log(
      "controller : getClientAdminById : middleware => req.clientId: ",
      req.clientId
    );
    const client = await clientAdminService.getClientAdminById(req.clientId);
    res.status(200).json({ status: "okkk", data: client });
  } catch (error) {
    res
      .status(error?.status || 700)
      .json({ status: "failed", data: error.msg });
  }
};

const logoutClientAdmin = async (req, res) => {
  res.cookie("access_token", "", {
    expires: new Date(0),
    secure: true,
    httpOnly: true,
    sameSite: "None",
  });
  res.status(200).json({ status: "ok", data: "Logout successful" });
};

export {
  createClientAdmin,
  loginClientAdmin,
  getClientAdminById,
  logoutClientAdmin,
};
