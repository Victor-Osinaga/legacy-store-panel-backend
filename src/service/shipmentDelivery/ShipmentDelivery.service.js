import { v4 as uuidv4 } from 'uuid'
import { ShipmentDelivery } from '../../model/shipmentDelivery/model/ShipmentDelivery.model.js'

class ShipmentDeliveryService {
    constructor(repository){
        this.shipmentDeliveryRepository = repository
    }

    async createShipmentDelivery (body) {
        try {
            // const existShipmentDeliveryByProvince = await this.shipmentDeliveryRepository.repoGetShipmentDeliveryByProvince(body.province)
            // if(existShipmentDeliveryByProvince != null) throw {msg: "Ya existe esa provincia", status: 400}

            const { id, shipingCost, ...newBody } = body

            const shipmentDeliveryNoDto = new ShipmentDelivery({
                id: uuidv4(),
                shipingCost: Number(shipingCost),
                ...newBody
            })

            const createdShipmentDelivery = await this.shipmentDeliveryRepository.repoCreateShipmentDelivery(shipmentDeliveryNoDto.convertToDTO())
            const newShipmentDelivery = new ShipmentDelivery(createdShipmentDelivery)
            return newShipmentDelivery.convertToDTO()
        } catch (error) {
            console.log("desde ShipmentDeliveryService : createShipmentDelivery", error);
            throw error
        }
    }

    async getShipmentsDelivery() {
        try {
            const shipmentsDelivery = await this.shipmentDeliveryRepository.repoGetShipmentsDelivery();
            return shipmentsDelivery;
        } catch (error) {
            console.log("desde ShipmentDeliveryService : getShipmentsDelivery", error);
            throw error
        }
    }
}

export {
    ShipmentDeliveryService
}