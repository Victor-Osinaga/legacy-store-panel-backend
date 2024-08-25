class ShipmentDelivery {
    #id
    #province
    #shipingCost

    constructor({ id, province, shipingCost }){
        this.setId(id)
        this.setProvince(province)
        this.setShipingCost(shipingCost)
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
    setShipingCost(shipingCost) {
        if(!shipingCost || typeof shipingCost !== 'number') throw { msg: "SHIPING COST es requerido" }
        this.#shipingCost = shipingCost
    }
    getShipingCost() { return this.#shipingCost }

    // DTO
    convertToDTO() {
        return Object.freeze({
            id: this.#id,
            province: this.#province,
            shipingCost: this.#shipingCost
        })
    }
}

export {
    ShipmentDelivery
}