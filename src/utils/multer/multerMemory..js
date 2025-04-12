import multer from "multer";

const uploadMemory = multer({
  storage: multer.memoryStorage(),
});

export { uploadMemory };
