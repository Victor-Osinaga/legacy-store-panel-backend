class ShipmentDelivery {
    #id
    #province
    #shipmentCost
    #shipmentType

    constructor({ id, province, shipmentCost, shipmentType }){
        this.setId(id)
        this.setProvince(province)
        this.setShipmentCost(shipmentCost)
        this.setShipmentType(shipmentType)
    }

    // getter y setter ID
    setId(id) {
        if(!id || id.trim() == "" || typeof id !== 'string') throw { msg: "ID es requerido" }
        this.#id = id
    }
    getId() { return this.#id }

    // getter y setter PROVINCE
    setProvince(province) {
        if(!province || province.trim() == "" || typeof province !== 'string') throw { msg: "PROVINCE es requerido" }
        this.#province = province
    }
    getProvince() { return this.#province }

    // getter y setter SHIPING COST
    setShipmentCost(shipmentCost) {
        if(!shipmentCost || typeof shipmentCost !== 'number') throw { msg: "SHIPMENT COST es requerido" }
        this.#shipmentCost = shipmentCost
    }
    getShipmentCost() { return this.#shipmentCost }

    // getter y setter SHIPMENT TYPE
    setShipmentType(shipmentType) {
        if (!shipmentType || shipmentType === undefined || shipmentType === "" || shipmentType.length == 0 || shipmentType.trim() == "") throw { msg: "SHIPMENT TYPE es requerida" }
        this.#shipmentType = shipmentType
    }
    getShipmentType() { return this.#shipmentType }

    // DTO
    convertToDTO() {
        return Object.freeze({
            id: this.#id,
            province: this.#province,
            shipmentCost: this.#shipmentCost,
            shipmentType: this.#shipmentType,
        })
    }
}

export {
    ShipmentDelivery
}