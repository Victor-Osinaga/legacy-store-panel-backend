class ShipmentLocalRepository {
    constructor(dao){
        this.dao = dao
    }

    async repoGetShipmentLocalByName(shipmentName){
        try {
            const shipmentLocalByNameNoDto = await this.dao.getShipmentLocalByName(shipmentName)
            if(!shipmentLocalByNameNoDto) return null
            return shipmentLocalByNameNoDto
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoGetShipmentLocalByName", error);
            throw error
            
        }
    }

    async repoCreateShipmentLocal (shipmentLocalDto) {
        try {
            const createdShipmentLocal = await this.dao.createShipmentLocal(shipmentLocalDto)
            return createdShipmentLocal
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoCreateShipmentLocal", error);
            throw error
        }
    }

    async repoGetShipmentsLocal(){
        try {
            // await this.dao.connect(url, dbname);
            const shipmentsLocal = await this.dao.getShipmentsLocal()
            return shipmentsLocal
        } catch (error) {
            console.log("Error desde ShipmentLocalRepository : repoGetShipmentsLocal", error);
            throw error
        }
    }
}

export {
    ShipmentLocalRepository
}