import sharp from "sharp";

async function optimizeImageLogo(req, res, next) {
  console.log("req.file from optimizeImageLogo: ", req.file);
  console.log("req.body optimizeImageLogo: ", req.body);

  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Debe cargar un logo" });
    }
    const optimizedLogo = await sharp(req.file.buffer)
      .resize(300)
      .toFormat("webp", { quality: 70 })
      .toBuffer();

    req.processedLogo = optimizedLogo;
    console.log("processed logo: ", optimizedLogo);
    next();
  } catch (error) {
    console.log("Error al optimizar la imagen");
    return res.status(400).json({ msg: "Error al optimizar la imagen" });
  }
}

export { optimizeImageLogo };
