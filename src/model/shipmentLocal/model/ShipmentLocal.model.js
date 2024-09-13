class ShimpmentLocal {
    #id
    #province
    #locality
    #postalCode
    #streetName
    #streetNumber
    #shipmentCost
    #shipmentType

    constructor({ id, province, locality, postalCode, streetName, streetNumber, shipmentCost, shipmentType }) {
        this.setId(id)
        this.setProvince(province)
        this.setLocality(locality)
        this.setPostalCode(postalCode)
        this.setStreetName(streetName)
        this.setStreetNumber(streetNumber)
        this.setShipmentCost(shipmentCost)
        this.setShipmentType(shipmentType)
    }

    // getter y setter ID
    setId(id) {
        if (!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw { msg: "ID es requerida" }
        this.#id = id
    }
    getId() { return this.#id }

    // getter y setter PROVINCE
    setProvince(province) {
        if (!province || province === undefined || province === "" || province.length == 0 || province.trim() == "") throw { msg: "PROVINCE es requerida" }
        this.#province = province
    }
    getProvince() { return this.#province }

    // getter y setter LOCALITY
    setLocality(locality) {
        if (!locality || locality === undefined || locality === "" || locality.length == 0 || locality.trim() == "") throw { msg: "LOCALITY es requerida" }
        this.#locality = locality
    }
    getLocality() { return this.#locality }

    // getter y setter POSTAL CODE
    setPostalCode(postalCode) {
        if (!postalCode || postalCode === undefined || postalCode === "" || postalCode.length == 0 || postalCode.trim() == "") throw { msg: "POSTAL CODE es requerida" }
        this.#postalCode = postalCode
    }
    getPostalCode() { return this.#postalCode }

    // getter y setter STREET NAME
    setStreetName(streetName) {
        if (!streetName || streetName === undefined || streetName === "" || streetName.length == 0 || streetName.trim() == "") throw { msg: "STREET NAME es requerida" }
        this.#streetName = streetName
    }
    getStreetName() { return this.#streetName }

    // getter y setter STREET NUMBER
    setStreetNumber(streetNumber) {
        if (!streetNumber || streetNumber === undefined || streetNumber === "" || streetNumber.length == 0 || streetNumber.trim() == "") throw { msg: "STREET NUMBER es requerida" }
        this.#streetNumber = streetNumber
    }
    getStreetNumber() { return this.#streetName }

    // getter y setter SHIPMENT COST
    setShipmentCost(shipmentCost) {
        if (shipmentCost === '' || shipmentCost == null || shipmentCost == undefined || typeof shipmentCost !== 'number') throw { msg: "SHIPMENT COST es requerido" }
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
            locality: this.#locality,
            postalCode: this.#postalCode,
            streetName: this.#streetName,
            streetNumber: this.#streetNumber,
            shipmentCost: this.#shipmentCost,
            shipmentType: this.#shipmentType
        })
    }
}

export {
    ShimpmentLocal
}