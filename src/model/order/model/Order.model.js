class Order{
    #id
    #paymentId
    #tipoDePago
    #metodoDePago
    #costoEnvio
    #totalDeCompra
    #totalConEnvio
    #netoRecibido
    #comisionMp
    #cuotas
    #fechaDeLiberacion
    #timestamp
    // #tipoEnvio
    #direccionEnvio
    #payer
    #products
    #status
    constructor({id, paymentId, tipoDePago, metodoDePago, costoEnvio, totalDeCompra, totalConEnvio, netoRecibido, comisionMp, cuotas, fechaDeLiberacion, timestamp, /*tipoEnvio,*/ direccionEnvio, payer, products, status}){
        this.setId(id)
        this.setPaymentId(paymentId)
        this.setTipoDePago(tipoDePago)
        this.setMetodoDePago(metodoDePago)
        this.setCostoEnvio(costoEnvio)
        this.setTotalDeCompra(totalDeCompra)
        this.setTotalConEnvio(totalConEnvio)
        this.setNetoRecibido(netoRecibido)
        this.setComisionMp(comisionMp)
        this.setCuotas(cuotas)
        this.setFechaDeLiberacion(fechaDeLiberacion)
        this.setTimestamp(timestamp)
        // this.setTipoEnvio(tipoEnvio)
        this.setDireccionEnvio(direccionEnvio)
        this.setPayer(payer)
        this.setProducts(products)
        this.setStatus(status)
    }

    // getter y setter TIPO DE PAGO
    setId(id){
        if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
        this.#id = id
    }
    getId(){return this.#id}

    // getter y setter ID
    // setId(id){
    //     if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
    //     this.#id = id
    // }
    // getId(){return this.#id}

    // getter y setter NAME
    // setName(name){
    //     if(!name || name === undefined || name === "" || name.length == 0 || name.trim() == "") throw {msg: "NAME es requerida"}
    //     this.#name = name
    // }
    // getName(){return this.#name}

    // getter y setter LASTNAME
    // setLastname(lastname){
    //     if(!lastname || lastname === undefined || lastname === "" || lastname.length == 0 || lastname.trim() == "") throw {msg: "LASTNAME es requerida"}
    //     this.#lastname = lastname
    // }
    // getLastname(){return this.#lastname}

    // getter y setter EMAIL
    // setEmail(email){
    //     if(!email || email === undefined || email === "" || email.length == 0 || email.trim() == "") throw {msg: "EMAIL es requerida"}
    //     this.#email = email
    // }
    // getEmail(){return this.#email}

    // getter y setter PHONE
    // setPhone(phone){
    //     if(!phone || phone === undefined || phone === "" || phone.length == 0 || phone.trim() == "") throw {msg: "PHONE es requerida"}
    //     this.#phone = phone
    // }
    // getPhone(){return this.#phone}

    // getter y setter PAYMENT ID
    setPaymentId(paymentId){
        if(typeof paymentId !== 'number') throw {msg: "PAYMENT ID es requerida"}
        this.#paymentId = paymentId
    }
    getPaymentId(){return this.#paymentId}

    // getter y setter TIPO DE PAGO
    setTipoDePago(tipoDePago){
        if(!tipoDePago || tipoDePago === undefined || tipoDePago === "" || tipoDePago.length == 0 || tipoDePago.trim() == "") throw {msg: "TIPO DE PAGO es requerida"}
        this.#tipoDePago = tipoDePago
    }
    getTipoDePago(){return this.#tipoDePago}

    // getter y setter METODO DE PAGO
    setMetodoDePago(metodoDePago){
        if(!metodoDePago || metodoDePago === undefined || metodoDePago === "" || metodoDePago.length == 0 || metodoDePago.trim() == "") throw {msg: "METODO DE PAGO es requerida"}
        this.#metodoDePago = metodoDePago
    }
    getMetodoDePago(){return this.#metodoDePago}

    // getter y setter COSTO ENVIO
    setCostoEnvio(costoEnvio){
        if(typeof costoEnvio !== 'number') throw {msg: "COSTO ENVIO es requerida"}
        this.#costoEnvio = costoEnvio
    }
    getCostoEnvio(){return this.#costoEnvio}

    // getter y setter TOTAL DE COMPRA
    setTotalDeCompra(totalDeCompra){
        if(typeof totalDeCompra !== 'number') throw {msg: "TOTAL DE COMPRA es requerida"}
        this.#totalDeCompra = totalDeCompra
    }
    getTotalDeCompra(){return this.#totalDeCompra}

    // getter y setter TOTAL CON ENVIO
    setTotalConEnvio(totalConEnvio){
        if(typeof totalConEnvio !== 'number') throw {msg: "TOTAL CON ENVIO es requerida"}
        this.#totalConEnvio = totalConEnvio
    }
    getTotalConEnvio(){return this.#totalConEnvio}

    // getter y setter NETO RECIBIDO
    setNetoRecibido(netoRecibido){
        if(typeof netoRecibido !== 'number') throw {msg: "NETO RECIBIDO es requerida"}
        this.#netoRecibido = netoRecibido
    }
    getNetoRecibido(){return this.#netoRecibido}

    // getter y setter COMISION MP
    setComisionMp(comisionMp){
        if(typeof comisionMp !== 'number') throw {msg: "COMISION MP es requerida"}
        this.#comisionMp = comisionMp
    }
    getComisionMp(){return this.#comisionMp}

    // getter y setter CUOTAS
    setCuotas(cuotas){
        if(Number.isInteger(cuotas) === false) throw {msg: "CUOTAS es requerida"}
        this.#cuotas = cuotas
    }
    getCuotas(){return this.#cuotas}

    // getter y setter FECHA DE LIBERACION
    setFechaDeLiberacion(fechaDeLiberacion){
        if(!fechaDeLiberacion || fechaDeLiberacion === undefined || fechaDeLiberacion === "" || fechaDeLiberacion.length == 0 || fechaDeLiberacion.trim() == "") throw {msg: "FECHA DE LIBERACION es requerida"}
        this.#fechaDeLiberacion = fechaDeLiberacion
    }
    getFechaDeLiberacion(){return this.#fechaDeLiberacion}

    // getter y setter TIMESTAMP
    setTimestamp(timestamp){
        if(!timestamp || timestamp === undefined || timestamp === "" || timestamp.length == 0 || timestamp.trim() == "") throw {msg: "TIMESTAMP es requerida"}
        this.#timestamp = timestamp
    }
    getTimestamp(){return this.#timestamp}

    // getter y setter TIPO_ENVIO
    // setTipoEnvio(tipoEnvio){
    //     if(!tipoEnvio || tipoEnvio === undefined || tipoEnvio === "" || tipoEnvio.length == 0 || tipoEnvio.trim() == "") throw {msg: "TIPO ENVIO es requerida"}
    //     this.#tipoEnvio = tipoEnvio
    // }
    // getTipoEnvio(){return this.#tipoEnvio}

    // getter y setter DIRECCION
    setDireccionEnvio(direccionEnvio){
        if(!direccionEnvio || direccionEnvio === undefined || typeof direccionEnvio !== "object" ) throw {msg: "DIRECCION DE ENVIO es requerida"}
        this.#direccionEnvio = direccionEnvio
    }
    getDireccionEnvio(){return this.#direccionEnvio}

    // getter y setter PAYER
    setPayer(payer){
        if(!payer || payer === undefined || typeof payer !== "object" ) throw {msg: "PAYER es requerida"}
        this.#payer = payer
    }
    getPayer(){return this.#payer}

    // getter y setter PRODUCTS
    setProducts(products){
        if(!products || products === undefined || Array.isArray(products) === false /*|| color === "" || color.length == 0 || color.trim() == ""*/) throw {msg: "PRODUCTS es requerida"}
        
        this.#products = products
        // console.log("los prod", this.#products);
    }
    getProducts(){return this.#products}

    // getter y setter STATUS
    setStatus(status){
        if(!status || status === undefined || status === "" || status.length == 0 || status.trim() == "") throw {msg: "ID es requerida"}
        this.#status = status
    }
    getStatus(){return this.#status}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            paymentId: this.#paymentId,
            tipoDePago: this.#tipoDePago,
            metodoDePago: this.#metodoDePago,
            costoEnvio: this.#costoEnvio,
            totalDeCompra: this.#totalDeCompra,
            totalConEnvio: this.#totalConEnvio,
            netoRecibido: this.#netoRecibido,
            comisionMp: this.#comisionMp,
            cuotas: this.#cuotas,
            fechaDeLiberacion: this.#fechaDeLiberacion,
            timestamp: this.#timestamp,
            // tipoEnvio: this.#tipoEnvio,
            direccionEnvio: this.#direccionEnvio,
            payer: this.#payer,
            products: this.#products,
            status: this.#status
        })
    }
}

export {
    Order
}