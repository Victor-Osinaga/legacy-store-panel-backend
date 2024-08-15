class ClientAdminRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoGetClientsAdmins() {
        try {
            const clients = await this.dao.getClientsAdmins();
            return clients;
        } catch (error) {
            throw error
        }
    }

    async repoCreateClientAdmin (clientDto) {
        try {
            const newClient = await this.dao.createClientAdmin(clientDto)
            return newClient
        } catch (error) {
            throw error
        }
    }

    async repoGetClientAdminByEmail (email) {
        try {
            const client = await this.dao.getClientAdminByEmail(email)
            return client
        } catch (error) {
            throw error
        }
    }

    async repoGetClientAdminByProyectName (proyectName) {
        try {
            const client = await this.dao.getClientAdminByProyectName(proyectName)
            return client
        } catch (error) {
            throw error
        }
    }
    
    async repoGetClientAdminById (clientId) {
        try {
            const client = await this.dao.getClientAdminById(clientId)
            return client
        } catch (error) {
            throw error
        }
    }

    async repoGetClientAdminBySubdomain (subdomain) {
        try {
            const client = await this.dao.getClientAdminBySubdomain(subdomain)
            return client
        } catch (error) {
            throw error
        }
    }
}

export {
    ClientAdminRepository
}