class Category2 {
  #id;
  #name;
  #childs;
  #parentId;
  #parentNodeId;
  #level;

  constructor({ id, name, childs, parentId, parentNodeId, level }) {
    this.setId(id);
    this.setName(name);
    this.setChilds(childs, level);
    this.setParentId(parentId, level);
    this.setParentNodeId(parentNodeId, level);
    this.setLevel(level);
  }

  // getter y setter ID
  setId(id) {
    if (
      !id ||
      id === undefined ||
      id === "" ||
      id.length == 0 ||
      id.trim() == ""
    )
      throw { msg: "ID es requerida", status: 400 };
    this.#id = id;
  }
  getId() {
    return this.#id;
  }

  // getter y setter NAME
  setName(name) {
    if (!name || name.trim() == "")
      throw { msg: "NAME es requerida", status: 400 };
    this.#name = name;
  }
  getName() {
    return this.#name;
  }

  // getter y setter CHILDS
  setChilds(childs, level) {
    if (level === "tertiary") {
      // Si es "tertiary", childs puede ser null
      if (childs !== null)
        throw {
          msg: "childs debe ser null para una categoría terciaria",
          status: 400,
        };
      this.#childs = null;
    } else {
      // Si no es "tertiary", childs es obligatorio
      if (!childs) throw { msg: "CHILDS es requerida", status: 400 };
      this.#childs = childs;
    }
  }
  getChilds() {
    return this.#childs;
  }

  // getter y setter PARENTID
  setParentId(parentId, level) {
    if (level === "primary") {
      // Si es "primary", parentId puede ser null
      if (parentId !== null)
        throw {
          msg: "parentId debe ser null para una categoría primaria",
          status: 400,
        };
      this.#parentId = null;
    } else {
      // Si no es "primary", parentId es obligatorio
      if (!parentId || parentId.trim() === "")
        throw { msg: "PARENTID es requerida", status: 400 };
      this.#parentId = parentId;
    }
  }
  getParentId() {
    return this.#parentId;
  }

  // getter y setter PARENTNODEID
  setParentNodeId(parentNodeId, level) {
    console.log("parentNodeId", parentNodeId);

    if (level === "primary") {
      // Si es "primary", parentNodeId puede ser null
      if (parentNodeId !== null)
        throw {
          msg: "parentNodeId debe ser null para una categoría primaria",
          status: 400,
        };
      this.#parentNodeId = null;
    } else {
      // Si no es "primary", parentNodeId es obligatorio
      if (!parentNodeId || parentNodeId.trim() === "")
        throw { msg: "PARENTNODEID es requerida", status: 400 };
      this.#parentNodeId = parentNodeId;
    }
  }
  getParentNodeId() {
    return this.#parentNodeId;
  }

  // getter y setter LEVEL
  setLevel(level) {
    if (!level || level.trim() == "")
      throw { msg: "LEVEL es requerida", status: 400 };
    this.#level = level;
  }
  getLevel() {
    return this.#level;
  }

  // DTO
  convertToDTO() {
    return Object.freeze({
      id: this.#id,
      name: this.#name,
      childs: this.#childs,
      parentId: this.#parentId,
      parentNodeId: this.#parentNodeId,
      level: this.#level,
    });
  }
}

export { Category2 };
