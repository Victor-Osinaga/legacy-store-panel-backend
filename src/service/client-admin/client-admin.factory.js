import clientAdminDao from "../../dao/client-admin/index.dao.js";
import { ClientAdminRepository } from "./Client-admin.repository.js";
import { ClientAdminService } from "./Client-admin.service.js";

const repository = new ClientAdminRepository(clientAdminDao)
const clientAdminService = new ClientAdminService(repository)

export default clientAdminService;