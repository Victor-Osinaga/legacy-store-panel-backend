class Order {
    #id
    #payment_id
    #shipment_cost
    #total_paid_amount
    #net_received_amount
    #payment_type
    #installments
    #money_release_date
    #timestamp
    #order_status
    #products
    #shipment_info
    #client_info_contact
    constructor({
        id,
        payment_id,
        shipment_cost,
        total_paid_amount,
        net_received_amount,
        payment_type,
        installments,
        money_release_date,
        timestamp,
        order_status,
        products,
        shipment_info,
        client_info_contact,
    }) {
        this.setId(id)
        this.setPaymentId(payment_id)
        this.setShipmentCost(shipment_cost)
        this.setTotalPaidAmount(total_paid_amount)
        this.setNetReceivedAmount(net_received_amount)
        this.setPaymentType(payment_type)
        this.setInstallments(installments)
        this.setMoneyReleaseDate(money_release_date)
        this.setTimestamp(timestamp)
        this.setOrderStatus(order_status)
        this.setProducts(products)
        this.setShipmentInfo(shipment_info)
        this.setClientInfoContact(client_info_contact)
    }

    // getter y setter ID
    setId(id){
        if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
        this.#id = id
    }
    getId(){return this.#id}

    // getter y setter PAYMENTID
    setPaymentId(payment_id){
        if(!payment_id || payment_id === undefined || payment_id === "" || payment_id.length == 0 || payment_id.trim() == "") throw {msg: "PAYMENT ID es requerida"}
        this.#payment_id = payment_id
    }
    getPaymentId(){return this.#payment_id}

    // getter y setter SHIPMENT COST
    setShipmentCost(shipment_cost){
        if(!shipment_cost || typeof shipment_cost !== 'number') throw {msg: "SHIPMENT COST es requerido"}
        this.#shipment_cost = shipment_cost
    }
    getShipmentCost(){return this.#shipment_cost}

    // getter y setter TOTAL PAID AMOUNT
    setTotalPaidAmount(total_paid_amount){
        if(!total_paid_amount || typeof total_paid_amount !== 'number') throw {msg: "TOTAL PAID AMOUNT es requerido"}
        this.#total_paid_amount = total_paid_amount
    }
    getTotalPaidAmount(){return this.#total_paid_amount}

    // getter y setter NET RECEIVER AMOUNT
    setNetReceivedAmount(net_received_amount){
        if(!net_received_amount || typeof net_received_amount !== 'number') throw {msg: "NET RECEIVED AMOUNT es requerido"}
        this.#net_received_amount = net_received_amount
    }
    getNetReceivedAmount(){return this.#net_received_amount}

    // getter y setter PAYMENT TYPE
    setPaymentType(payment_type){
        if(!payment_type || payment_type === undefined || payment_type === "" || payment_type.length == 0 || payment_type.trim() == "") throw {msg: "PAYMENT TYPE es requerida"}
        this.#payment_type = payment_type
    }
    getPaymentType(){return this.#payment_type}

    
    // getter y setter ORDER STATUS
    setOrderStatus(order_status){
        if(!order_status || order_status === undefined || order_status === "" || order_status.length == 0 || order_status.trim() == "") throw {msg: "ORDER STATUS es requerida"}
        this.#order_status = order_status
    }
    getOrderStatus(){return this.#order_status}

    // getter y setter INSTALLMENTS
    setInstallments(installments){
        if(!installments || typeof installments !== 'number') throw {msg: "INSTALLMENTS es requerido"}
        this.#installments = installments
    }
    getInstallments(){return this.#installments}

    // getter y setter MONEY RELEASE DATE
    setMoneyReleaseDate(money_release_date){
        if(!money_release_date || money_release_date === undefined || money_release_date === "" || money_release_date.length == 0 || money_release_date.trim() == "") throw {msg: "MONEY RELEASE DATE es requerida"}
        this.#money_release_date = money_release_date
    }
    getMoneyReleaseDate(){return this.#money_release_date}

    // getter y setter TIMESTAMP
    setTimestamp(timestamp){
        if(!timestamp || timestamp === undefined || timestamp === "" || timestamp.length == 0 || timestamp.trim() == "") throw {msg: "TIMESTAMP es requerida"}
        this.#timestamp = timestamp
    }
    getTimestamp(){return this.#timestamp}

    // getter y setter PRODUCTS
    setProducts(products){
        if(!products || !Array.isArray(products)) throw {msg: "PRODUCTS es requerido"}
        this.#products = products
    }
    getProducts(){return this.#products}

    // getter y setter SHIPMENT INFO
    setShipmentInfo(shipment_info){
        if(!shipment_info || typeof shipment_info !== 'object') throw {msg: "SHIPMENT INFO es requerido"}
        this.#shipment_info = shipment_info
    }
    getShipmentInfo(){return this.#shipment_info}

    // getter y setter CLIENT INFO CONTACT
    setClientInfoContact(client_info_contact){
        if(!client_info_contact || typeof client_info_contact !== 'object') throw {msg: "CLIENT INFO CONTACT es requerido"}
        this.#client_info_contact = client_info_contact
    }
    getClientInfoContact(){return this.#client_info_contact}

    // DTO
    convertToDTO() {
        return Object.freeze({
            id: this.#id,
            payment_id: this.#payment_id,
            shipment_cost: this.#shipment_cost,
            total_paid_amount: this.#total_paid_amount,
            net_received_amount: this.#net_received_amount,
            payment_type: this.#payment_type,
            installments: this.#installments,
            money_release_date: this.#money_release_date,
            timestamp: this.#timestamp,
            order_status: this.#order_status,
            products: this.#products,
            shipment_info: this.#shipment_info,
            client_info_contact: this.#client_info_contact
        })
    }
}

export {
    Order
}