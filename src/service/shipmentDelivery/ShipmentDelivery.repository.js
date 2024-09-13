class ShipmentDeliveryRepository {
    constructor(dao) {
        this.dao = dao
    }

    // REPOSITORY API-PANEL
    async repoCreateShipmentDelivery(data){
        try {
            const createdShipmentDelivery = await this.dao.createShipmentDelivery(data)
            return createdShipmentDelivery
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoCreateShipmentDelivery", error);
            throw error
        }
    }

    async repoGetShipmentsDelivery() {
        try {
            const shipmentsDelivery = await this.dao.getShipmentsDelivery()
            return shipmentsDelivery
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoGetShipmentsDelivery", error);
            throw error
        }
    }

    async repoGetShipmentDeliverylById(id){
        try {
            const shipmentDeliveryByIdNoDto = await this.dao.getShipmentDeliveryById(id)
            if(!shipmentDeliveryByIdNoDto) return null
            return shipmentDeliveryByIdNoDto
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoGetShipmentDeliverylById", error);
            throw error
        }
    }

    async repoDeleteShipmentDeliveryById(id) {
        try {
            const deletedShipmentDelivery = await this.dao.deleteShipmentDeliveryById(id)
            return deletedShipmentDelivery
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoDeleteShipmentDeliveryById", error);
            throw error
        }
    }

    async repoUpdateShipmentDeliveryById(id, data) {
        try {
            const updatedShipmentDeliveryById = await this.dao.updateShipmentDeliveryById(id, data)
            return updatedShipmentDeliveryById
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoUpdateShipmentDeliveryById", error);
            throw error
        }
    }

    // REPOSITORY API-STORE
    async repoGetShipmentsDeliveryStore() {
        try {
            const shipmentsDelivery = await this.dao.getShipmentsDeliveryStore()
            return shipmentsDelivery
        } catch (error) {
            console.log("Error desde ShipmentDeliveryRepository : repoGetShipmentsDelivery", error);
            throw error
        }
    }
}

export {
    ShipmentDeliveryRepository
}