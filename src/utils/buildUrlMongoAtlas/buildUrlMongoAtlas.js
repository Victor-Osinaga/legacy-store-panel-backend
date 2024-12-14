import config from "../../../config.js";

export default function buildUrlMongoAtlas(dbName) {
  return `${config.prod_url1}${dbName}?retryWrites=true&w=majority&appName=Ecommerce`;
}
