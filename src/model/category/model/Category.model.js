class Category {
    #id
    #name
    #subCategories
    
    constructor({id, name, subCategories}){
        this.setId(id)
        this.setName(name)
        this.setSubCategories(subCategories)
    }

    // getter y setter ID
    setId(id){
        if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
        this.#id = id
    }
    getId(){return this.#id}

    // getter y setter NAME
    setName(name){
        if(!name || name === undefined || name === "" || name.length == 0 || name.trim() == "") throw {msg: "NAME es requerida"}
        this.#name = name
    }
    getName(){return this.#name}

    // getter y setter CATEGORIES
    setSubCategories(subCategories){
        if(!subCategories || subCategories === undefined || Array.isArray(subCategories) === false) throw {msg: "SUBCATEGORIES es requerida"}
        this.#subCategories = subCategories
    }
    getSubCategories(){return this.#subCategories}
    
    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            name: this.#name,
            subCategories: this.#subCategories,
        })
    }
}

export {Category}