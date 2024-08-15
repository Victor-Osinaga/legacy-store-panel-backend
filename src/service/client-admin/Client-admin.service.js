import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'
import { ClientAdmin } from '../../model/client-admin/model/ClientAdmin.model.js'

class ClientAdminService {
    constructor(repository) {
        this.clientAdminRepository = repository
    }

    async createClientAdmin(body) {
        try {
            const newClientAdminDto = new ClientAdmin({
                id: uuidv4(),
                ...body
            })

            const clientAdminByEmail = await this.clientAdminRepository.repoGetClientAdminByEmail(newClientAdminDto.getEmail())
            if (clientAdminByEmail != null) throw { msg: "Email ya registrado", status: 400 }

            const clientAdminByProyectName = await this.clientAdminRepository.repoGetClientAdminByProyectName(newClientAdminDto.getProyectName())
            if (clientAdminByProyectName != null) throw { msg: "Nombre del proyecto ya registrado", status: 400 }

            const clientAdminBySubdomain = await this.clientAdminRepository.repoGetClientAdminBySubdomain(newClientAdminDto.getSubdomain())
            if (clientAdminBySubdomain != null) throw { msg: "Subdominio ya registrado", status: 400 }

            newClientAdminDto.setPassword(await bcryptjs.hash(newClientAdminDto.getPassword(), 8))

            const registeredClientAdmin = await this.clientAdminRepository.repoCreateClientAdmin(newClientAdminDto.convertToDTO())

            const { subdomain, proyectName, ...otherData } = registeredClientAdmin;
            return { subdomain, proyectName }
        } catch (error) {
            console.log("desde clientAdmin service", error);
            throw error
        }
    }

    async loginClientAdmin(body) {
        try {
            if (!body?.email) throw { msg: "EMAIL es requerida", status: 400 }
            if (!body?.password) throw { msg: "PASSWORD es requerida", status: 400 }

            const clientByEmail = await this.clientAdminRepository.repoGetClientAdminByEmail(body.email)
            if (!clientByEmail) throw { msg: "No existe un cliente con ese Email", status: 400 }

            if (await bcryptjs.compare(body.password, clientByEmail.password)) {
                const { password, ...clientDataWithoutPassword } = clientByEmail;
                return clientDataWithoutPassword;
            } else {
                console.log("contraseña incorrecta")
                throw { msg: "Contraseña incorrecta", status: 400 }
            }
        } catch (error) {
            console.log("desde loginClient service", error);
            throw error
        }
    }

    async getClientAdminById(clientId) {
        try {
            const clientById = await this.clientAdminRepository.repoGetClientAdminById(clientId)
            if (!clientById) {
                throw { msg: "No existe un cliente con ese Id", status: 400 }
            }
            return clientById
        } catch (error) {
            console.log("desde getClientById service", error);
            throw error
        }
    }
}

export {
    ClientAdminService
}