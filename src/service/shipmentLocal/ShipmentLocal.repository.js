class ShipmentLocalRepository {
    constructor(dao) {
        this.dao = dao
    }

    async repoGetShipmentLocalByProvince(shipmentProvince) {
        try {
            const shipmentLocalByProvinceNoDto = await this.dao.getShipmentLocalByProvince(shipmentProvince)
            if (!shipmentLocalByProvinceNoDto) return null
            return shipmentLocalByProvinceNoDto
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoGetShipmentLocalByProvince", error);
            throw error

        }
    }

    async repoGetShipmentLocalById(id) {
        try {
            const shipmentLocalByIdNoDto = await this.dao.getShipmentLocalById(id)
            if (!shipmentLocalByIdNoDto) return null
            return shipmentLocalByIdNoDto
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoGetShipmentLocalById", error);
            throw error

        }
    }

    async repoDeleteShipmentLocalById(id)  {
        try {
            const deletedShipmentLocal = await this.dao.deleteShipmentLocalById(id)
            return deletedShipmentLocal
        } catch (error) {
            console.log("desde shipmentRepository : repoDeleteShipmentLocalById", error);
            throw error
        }
    }

    async repoCreateShipmentLocal(shipmentLocalDto) {
        try {
            const createdShipmentLocal = await this.dao.createShipmentLocal(shipmentLocalDto)
            return createdShipmentLocal
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoCreateShipmentLocal", error);
            throw error
        }
    }

    async repoGetShipmentsLocal() {
        try {
            // await this.dao.connect(url, dbname);
            const shipmentsLocal = await this.dao.getShipmentsLocal()
            return shipmentsLocal
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoGetShipmentsLocal", error);
            throw error
        }
    }

    async repoUpdateShipmentLocalById(id, data){
        try {
            const updatedShipmentLocal = await this.dao.updateShipmentLocalById(id, data)
            return updatedShipmentLocal
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoUpdateShipmentLocalById", error);
            throw error
        }
    }
}

export {
    ShipmentLocalRepository
}