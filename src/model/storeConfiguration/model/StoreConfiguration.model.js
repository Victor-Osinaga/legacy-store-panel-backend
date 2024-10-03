class StoreConfiguration {
    #id
    #storeConfigName
    #colors
    #footerConfig

    constructor({id, storeConfigName, colors, footerConfig}) {
        this.setId(id)
        this.setStoreConfigName(storeConfigName)
        this.setColors(colors)
        this.setFooterConfig(footerConfig)
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

    // getter y setter FOOTER CONFIG
    setFooterConfig(footerConfig){
        if(!footerConfig || typeof footerConfig !== 'object' || Array.isArray(footerConfig) || footerConfig === null) throw {msg: "FOOTER CONFIG es requerida"}
        this.#footerConfig = footerConfig
    }
    getFooterConfig(){return this.#footerConfig}

    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            storeConfigName: this.#storeConfigName,
            colors: this.#colors,
            footerConfig: this.#footerConfig
        })
    }
}

export {
    StoreConfiguration
}