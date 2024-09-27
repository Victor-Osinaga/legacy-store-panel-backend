import { v4 as uuidv4 } from 'uuid'
import { ShipmentDelivery } from '../../model/shipmentDelivery/model/ShipmentDelivery.model.js'

class ShipmentDeliveryService {
    constructor(repository){
        this.shipmentDeliveryRepository = repository
    }

    // SERVICES API-PANEL
    async createShipmentDelivery (body) {
        try {
            // const existShipmentDeliveryByProvince = await this.shipmentDeliveryRepository.repoGetShipmentDeliveryByProvince(body.province)
            // if(existShipmentDeliveryByProvince != null) throw {msg: "Ya existe esa provincia", status: 400}

            const { id, shipmentCost, shipingType, ...newBody } = body

            const shipmentDeliveryNoDto = new ShipmentDelivery({
                id: uuidv4(),
                shipmentCost: Number(shipmentCost),
                shipmentType: "shipment_delivery",
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

    async deleteShipmentDeliveryById(id) {
        try {
            const shipmentDeliveryNoDto = await this.shipmentDeliveryRepository.repoGetShipmentDeliverylById(id)
            if(!shipmentDeliveryNoDto) throw {msg: "No se encontro una provincia con ese ID", status: 404}

            const deletedShipmentDelivery = await this.shipmentDeliveryRepository.repoDeleteShipmentDeliveryById(id)

            return deletedShipmentDelivery
        } catch (error) {
            console.log("desde ShipmentDeliveryService : deleteShipmentDeliveryById", error);
            throw error
        }
    }

    async getShipmentDeliveryById(id) {
        try {
            const shipmentDeliveryNoDto = await this.shipmentDeliveryRepository.repoGetShipmentDeliverylById(id)
            if(!shipmentDeliveryNoDto) throw {msg: "No se encontro una provincia con ese ID", status: 404}

            return shipmentDeliveryNoDto
        } catch (error) {
            console.log("desde ShipmentDeliveryService : deleteShipmentDeliveryById", error);
            throw error
        }
    }

    async updateShipmentDeliveryById(idShipmentDelivery, body) {
        try {
            const shipmentDeliveryNoDto = await this.shipmentDeliveryRepository.repoGetShipmentDeliverylById(idShipmentDelivery);
            if(!shipmentDeliveryNoDto) throw {msg: "No se encontro una provincia con ese ID", status: 404};

            const { id, shipmentCost, ...newBody } = body
            const newShipmentDeliveryNoDto = new ShipmentDelivery({
                id: shipmentDeliveryNoDto.id,
                shipmentCost: Number(shipmentCost),
                ...newBody
            })

            const updatedShipmentDelivery = await this.shipmentDeliveryRepository.repoUpdateShipmentDeliveryById(id, newShipmentDeliveryNoDto.convertToDTO())
            if(!updatedShipmentDelivery) throw {msg: "No se pudo actualizar la provincia", status: 400};

            const newUpdatedShipmentDelivery = new ShipmentDelivery(updatedShipmentDelivery)
            return newUpdatedShipmentDelivery.convertToDTO()
        } catch (error) {
            console.log("desde ShipmentDeliveryService : updateShipmentDeliveryById", error);
            throw error
        }
    }

    // SERVICES API-STORE

    async getShipmentsDeliveryStore() {
        try {
            const shipmentsDelivery = await this.shipmentDeliveryRepository.repoGetShipmentsDeliveryStore();
            return shipmentsDelivery
        } catch (error) {
            console.log("desde ShipmentDeliveryService : getShipmentsDeliveryStore", error);
            throw error
        }
    }
}

export {
    ShipmentDeliveryService
}