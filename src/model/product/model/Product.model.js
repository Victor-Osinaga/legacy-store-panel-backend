class Product {
    #id
    #name
    #description
    #price
    #image
    #categories
    #sizes
    #weight
    #timestamp
    constructor({id, name, description, price, image, categories, timestamp, sizes, weight}){
        this.setId(id)
        this.setName(name)
        this.setDescription(description)
        this.setPrice(price)
        this.setImage(image)
        this.setCategories(categories)
        this.setSizes(sizes)
        this.setWeight(weight)
        this.setTimestamp(timestamp)
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
    
    // getter y setter DESCRIPTION
    setDescription(description){
        if(!description || description === undefined || description === "" || description.length == 0 || description.trim() == "") throw {msg: "DESCRIPTION es requerida"}
        this.#description = description
    }
    getDescription(){return this.#description}

    // getter y setter PRICE
    setPrice(price){
        if(!price || typeof price !== 'number') throw {msg: "PRICE es requerido"}
        this.#price = price
    }
    getPrice(){return this.#price}

    // getter y setter IMAGE
    setImage(image){
        if(!image || image === undefined || image === "" || image.length == 0 || image.trim() == "") throw {msg: "IMAGE es requerida"}
        this.#image = image
    }
    getImage(){return this.#image}

    // getter y setter CATEGORY
    setCategories(categories){
        if(!categories || categories === undefined || Array.isArray(categories) === false) throw {msg: "CATEGORIES es requerida"}
        this.#categories = categories
    }
    getCategories(){return this.#categories}

    // getter y setter SIZE
    setSizes(sizes){
        if(!sizes || sizes === undefined || Array.isArray(sizes) === false) throw {msg: "SIZES es requerida"}
        this.#sizes = sizes
    }
    getSizes(){return this.#sizes}

    // getter y setter PESO GRAMOS
    setWeight(weight){
        if(!weight || typeof weight !== 'number') throw {msg: "WEIGHT es requerido"}
        this.#weight = weight
    }
    getWeight(){return this.#weight}

    // getter y setter TIMESTAMP
    setTimestamp(timestamp){
        if(!timestamp || timestamp === undefined || timestamp === "" || timestamp.length == 0 || timestamp.trim() == "") throw {msg: "TIMESTAMP es requerido"}
        this.#timestamp = timestamp
    }
    getTimestamp(){return this.#timestamp}
    
    // DTO
    convertToDTO(){
        return Object.freeze({
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            image: this.#image,
            categories: this.#categories,
            sizes: this.#sizes,
            weight: this.#weight,
            timestamp: this.#timestamp
        })
    }
}

export {Product}