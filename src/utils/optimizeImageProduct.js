import sharp from "sharp";

async function optimizeImageProduct(req) {
  console.log("req.file", req.file);
  console.log("body", req.body);

  try {
    if (!req.file) {
      throw { msg: "No se subio ninguna imgagen de producto", status: 400 };
    }

    const processedImageProduct = await sharp(req.file.buffer)
      .resize(700)
      .toFormat("webp", { quality: 60 })
      .toBuffer();

    console.log("processedImageProduct", processedImageProduct);
    return processedImageProduct;
  } catch (error) {
    console.log("error en optimizeImageProduct: ", error);
    throw { msg: "Error al optimizar la imagen del producto", status: 500 };
  }
}

export { optimizeImageProduct };
