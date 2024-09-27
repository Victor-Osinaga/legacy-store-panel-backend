class StoreConfiguration {
    #id
    #storeConfigName
    #colors

    constructor({id, storeConfigName, colors}) {
        this.setId(id)
        this.setStoreConfigName(storeConfigName)
        this.setColors(colors)
    }

    // getter y setter ID
    setId(id){
        if(!id || id === undefined || id === "" || id.length == 0 || id.trim() == "") throw {msg: "ID es requerida"}
        this.#id = id
    }
    getId(){return this.#id}

    // getter y setter NAME
    setStoreConfigName(storeConfigName){
        if(!storeConfigName || storeConfigName === undefined || storeConfigName === "" || storeConfigName.length == 0 || storeConfigName.trim() == "") throw {msg: "NAME es requerida"}
        this.#storeConfigName = storeConfigName
    }
    getStoreConfigName(){return this.#storeConfigName}

    // getter y setter COLORS
    setColors(colors){
        if(!colors || typeof colors !== 'object' || Array.isArray(colors) || colors === null) throw {msg: "COLORS es requerida"}
        this.#colors = colors
    }
    getColors(){return this.#colors}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            storeConfigName: this.#storeConfigName,
            colors: this.#colors,
        })
    }
}

export {
    StoreConfiguration
}