class StoreConfiguration {
    #id
    #storeConfigName
    #primaryColorStore

    constructor({id, storeConfigName, primaryColorStore}) {
        this.setId(id)
        this.setStoreConfigName(storeConfigName)
        this.setPrimaryColorStore(primaryColorStore)
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

    // getter y setter NAME
    setPrimaryColorStore(primaryColorStore){
        if(!primaryColorStore || primaryColorStore === undefined || primaryColorStore === "" || primaryColorStore.length == 0 || primaryColorStore.trim() == "") throw {msg: "PRIMARY COLOR es requerida"}
        this.#primaryColorStore = primaryColorStore
    }
    getPrimaryColorStore(){return this.#primaryColorStore}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            storeConfigName: this.#storeConfigName,
            primaryColorStore: this.#primaryColorStore,
        })
    }
}

export {
    StoreConfiguration
}