class ClientAdmin {
    #id
    #email
    #password
    #subdomain
    #proyectName
    #name
    #lastname
    constructor({ id, email, password, subdomain, proyectName, name, lastname }) {
        this.setId(id)
        this.setEmail(email)
        this.setPassword(password)
        this.setSubdomain(subdomain)
        this.setProyectName(proyectName)
        this.setName(name)
        this.setLastname(lastname)
    }

    // getter y setter ID
    setId(id) {
        if (!id || typeof id !== "string" || id.trim() == "")
            throw { msg: "ID es requerida" };
        this.#id = id;
    }
    getId() { return this.#id }

    // getter y setter EMAIL
    setEmail(email){
        if(!email || email === "" || email.length == 0 || email.trim() == "") throw {msg: "EMAIL es requerida"}
        this.#email = email
    }
    getEmail(){return this.#email}

    // getter y setter PASSWORD
    setPassword(password){
        if(!password || password === "" || password.length == 0 || password.trim() == "") throw {msg: "PASSWORD es requerida"}
        this.#password = password
    }
    getPassword(){return this.#password}

    // getter y setter SUBDOMAIN
    setSubdomain(subdomain){
        if(!subdomain || subdomain.length == 0 || subdomain.trim() == "") throw {msg: "SUBDOMAIN es requerida"}
        this.#subdomain = subdomain
    }
    getSubdomain(){return this.#subdomain}

    // getter y setter PROYECTNAME
    setProyectName(proyectName){
        if(!proyectName || proyectName.length == 0 || proyectName.trim() == "") throw {msg: "PROYECTNAME es requerida"}
        this.#proyectName = proyectName
    }
    getProyectName(){return this.#proyectName}

    // getter y setter NAME
    setName(name){
        if(!name || name.length == 0 || name.trim() == "") throw {msg: "NAME es requerida"}
        this.#name = name
    }
    getName(){return this.#name}

    // getter y setter LASTNAME
    setLastname(lastname){
        if(!lastname || lastname.length == 0 || lastname.trim() == "") throw {msg: "LASTNAME es requerida"}
        this.#lastname = lastname
    }
    getLastname(){return this.#lastname}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            email: this.#email,
            password: this.#password,
            subdomain: this.#subdomain,
            proyectName: this.#proyectName,
            name: this.#name,
            lastname: this.#lastname,
        })
    }
}

export {
    ClientAdmin
}