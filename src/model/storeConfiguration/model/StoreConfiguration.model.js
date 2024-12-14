class StoreConfiguration {
  #id;
  #storeConfigName;
  #colors;
  #footerConfig;
  #logoConfig;

  constructor({ id, storeConfigName, colors, footerConfig, logoConfig }) {
    this.setId(id);
    this.setStoreConfigName(storeConfigName);
    this.setColors(colors);
    this.setFooterConfig(footerConfig);
    this.setLogoConfig(logoConfig);
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
      throw { msg: "ID es requerida" };
    this.#id = id;
  }
  getId() {
    return this.#id;
  }

  // getter y setter NAME
  setStoreConfigName(storeConfigName) {
    if (
      !storeConfigName ||
      storeConfigName === undefined ||
      storeConfigName === "" ||
      storeConfigName.length == 0 ||
      storeConfigName.trim() == ""
    )
      throw { msg: "NAME es requerida" };
    this.#storeConfigName = storeConfigName;
  }
  getStoreConfigName() {
    return this.#storeConfigName;
  }

  // getter y setter COLORS
  setColors(colors) {
    if (
      !colors ||
      typeof colors !== "object" ||
      Array.isArray(colors) ||
      colors === null
    )
      throw { msg: "COLORS es requerida" };
    this.#colors = colors;
  }
  getColors() {
    return this.#colors;
  }

  // getter y setter FOOTER CONFIG
  setFooterConfig(footerConfig) {
    if (
      !footerConfig ||
      typeof footerConfig !== "object" ||
      Array.isArray(footerConfig) ||
      footerConfig === null
    )
      throw { msg: "FOOTER CONFIG es requerida" };
    this.#footerConfig = footerConfig;
  }
  getFooterConfig() {
    return this.#footerConfig;
  }

  // getter y setter LOGO CONFIG
  setLogoConfig(logoConfig) {
    if (
      !logoConfig ||
      typeof logoConfig !== "object" ||
      Array.isArray(logoConfig) ||
      logoConfig === null
    )
      throw { msg: "LOGO CONFIG es requerida" };
    this.#logoConfig = logoConfig;
  }
  getLogoConfig() {
    return this.#logoConfig;
  }

  // DTO
  convertToDTO() {
    return Object.freeze({
      id: this.#id,
      storeConfigName: this.#storeConfigName,
      colors: this.#colors,
      footerConfig: this.#footerConfig,
      logoConfig: this.#logoConfig,
    });
  }
}

export { StoreConfiguration };
