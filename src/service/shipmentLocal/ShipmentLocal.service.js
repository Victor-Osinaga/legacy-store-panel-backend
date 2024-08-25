import { v4 as uuidv4 } from 'uuid'
import { ShimpmentLocal } from '../../model/shipmentLocal/model/ShipmentLocal.model.js'

class ShipmentLocalService {
    constructor(repository) {
        this.shipmentLocalRepository = repository
    }

    async createShipmentLocal (body, dbname) {
        try {
            const existShipmentLocalByProvince = await this.shipmentLocalRepository.repoGetShipmentLocalByProvince(body.province)
            if(existShipmentLocalByProvince != null) throw {msg: "Ya existe una sucursal en esa provincia", status: 400}

            const {id, shipingCost, ...newBody} = body
            const shipmentLocalNoDto = new ShimpmentLocal({
                id: uuidv4(),
                shipingCost: Number(shipingCost),
                ...newBody
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

    async deleteShipmentLocalById(id) {
        try {
            const shipmentLocalNoDto = await this.shipmentLocalRepository.repoGetShipmentLocalById(id);
            if(!shipmentLocalNoDto) throw {msg: "No se encontro una sucursal con ese ID", status: 404}

            const deletedShipmentLocal = await this.shipmentLocalRepository.repoDeleteShipmentLocalById(id);
            // const deletedProductNoDto = new Product(productNoDto)
            // return deletedProductNoDto.convertToDTO()
            return deletedShipmentLocal
        } catch (error) {
            console.log("desde ShipmentLocalService : deleteShipmentLocalById", error);
            throw error
        }
    }

    async getShipmentLocalById(id){
        try {
            const shipmentLocalNoDto = await this.shipmentLocalRepository.repoGetShipmentLocalById(id);
            if(!shipmentLocalNoDto) throw {msg: "No se encontro una sucursal con ese ID", status: 404}
            // console.log(shipmentLocalNoDto);
            const shipmentLocal = new ShimpmentLocal(shipmentLocalNoDto)
            return shipmentLocal.convertToDTO()
        } catch (error) {
            console.log("desde ShipmentLocalService : getShipmentLocalById", error);
            throw error
        }
    }

    async updateShipmentLocalById(idShipment, body) {
        try {
            const shipmentLocalNoDto = await this.shipmentLocalRepository.repoGetShipmentLocalById(idShipment);
            if(!shipmentLocalNoDto) throw {msg: "No se encontro una sucursal con ese ID", status: 404}

            // const existShipmentLocalByProvince = await this.shipmentLocalRepository.repoGetShipmentLocalByProvince(body.province)
            // if(existShipmentLocalByProvince != null) throw {msg: "Ya existe una sucursal en esa provincia", status: 400}

            const {id, shipingCost, ...newBody} = body

            const newShipmentLocalNoDto = new ShimpmentLocal({
                id: shipmentLocalNoDto.id,
                shipingCost: Number(shipingCost),
                ...newBody
            })

            const updatedShipmentLocal = await this.shipmentLocalRepository.repoUpdateShipmentLocalById(id, newShipmentLocalNoDto.convertToDTO())
            if(!updatedShipmentLocal) throw {msg: "No se pudo actualizar la sucursal", status: 400}

            const newUpdatedShipmentLocal = new ShimpmentLocal(updatedShipmentLocal)
            return newUpdatedShipmentLocal.convertToDTO()
        } catch (error) {
            console.log("desde ShipmentLocalService : updateShipmentLocalById", error);
            throw error
        }
    }
}

export {
    ShipmentLocalService
}