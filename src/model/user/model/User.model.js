class User{
    #id
    #email
    #password
    #name
    #lastname
    #admin
    // #image
constructor({id, email, password, name, lastname, admin /*, image*/}){
        this.setId(id)
        this.setEmail(email)
        this.setPassword(password)
        this.setName(name)
        this.setLastname(lastname)
        this.setAdmin(admin)
        // this.setImage(image)
    }
    // getter y setter ID
    setId(id){
        if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
        this.#id = id
    }
    getId(){return this.#id}

    // getter y setter EMAIL
    setEmail(email){
        if(!email || email === undefined || email === "" || email.length == 0 || email.trim() == "") throw {msg: "EMAIL es requerida"}
        this.#email = email
    }
    getEmail(){return this.#email}

    // getter y setter PASSWORD
    setPassword(password){
        if(!password || password === undefined || password === "" || password.length == 0 || password.trim() == "") throw {msg: "PASSWORD es requerida"}
        this.#password = password
    }
    getPassword(){return this.#password}

    // getter y setter NAME
    setName(name){
        if(!name || name === undefined || name === "" || name.length == 0 || name.trim() == "") throw {msg: "NAME es requerida"}
        this.#name = name
    }
    getName(){return this.#name}

    // getter y setter LASTNAME
    setLastname(lastname){
        if(!lastname || lastname === undefined || lastname === "" || lastname.length == 0 || lastname.trim() == "") throw {msg: "LASTNAME es requerida"}
        this.#lastname = lastname
    }
    getLastname(){return this.#lastname}

    // getter y setter ADMIN
    setAdmin(admin){
        if(/*!admin || admin === undefined ||*/ typeof admin !== "boolean") throw {msg: "ADMIN es requerido"}
        this.#admin = admin
    }
    getAdmin(){return this.#admin}

    // getter y setter IMAGE
    // setImage(image){
    //     if(!image || image === undefined || image === "" || image.length == 0 || image.trim() == "") throw {msg: "IMAGE es requerida"}
    //     this.#image = image
    // }
    // getImage(){return this.#image}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            admin: this.#admin/*,
            image: this.#image*/
        })
    }
}

export {
    User
}