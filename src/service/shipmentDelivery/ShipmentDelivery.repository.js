class ShipmentDeliveryRepository {
    constructor(dao) {
        this.dao = dao
    }

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
}

export {
    ShipmentDeliveryRepository
}