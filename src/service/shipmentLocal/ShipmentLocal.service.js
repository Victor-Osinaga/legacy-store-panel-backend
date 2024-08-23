import { v4 as uuidv4 } from 'uuid'
import { ShimpmentLocal } from '../../model/shipmentLocal/model/ShipmentLocal.model.js'

class ShipmentLocalService {
    constructor(repository) {
        this.shipmentLocalRepository = repository
    }

    async createShipmentLocal (body, dbname) {
        try {
            const existShipmentLocalByName = await this.shipmentLocalRepository.repoGetShipmentLocalByName(body.name)
            if(existShipmentLocalByName != null) throw {msg: "Ya existe una sucursal con ese nombre", status: 400}

            const shipmentLocalNoDto = new ShimpmentLocal({
                id: uuidv4(),
                ...body
            })

            const createdShipmentLocal = await this.shipmentLocalRepository.repoCreateShipmentLocal(shipmentLocalNoDto.convertToDTO())
            const newShipmentLocal = new ShimpmentLocal(createdShipmentLocal)
            return newShipmentLocal.convertToDTO()
        } catch (error) {
            console.log("desde ShipmentLocalService : createShipmentLocal", error);
            throw error
        }
    }

    async getShipmentsLocal() {
        try {
            const shipmentsLocal = await this.shipmentLocalRepository.repoGetShipmentsLocal();
            return shipmentsLocal;
        } catch (error) {
            console.log("desde ShipmentLocalService : getShipmentsLocal", error);
            throw error
        }
    }
}

export {
    ShipmentLocalService
}