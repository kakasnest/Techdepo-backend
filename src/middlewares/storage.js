import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    const filePath = path.join(path.dirname("."), "images", file.fieldname);

    fs.access(filePath, (error) => {
      if (error) {
        fs.mkdir(filePath, (error) => {
          next(null, filePath);
        });
      } else {
        next(null, filePath);
      }
    });
  },
  filename: (req, file, next) => {
    const random = Math.round(Math.random() * 1e9);
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    const uniqueName = `${random}${Date.now()}.${fileExtension}`;
    next(null, uniqueName);
  },
});

export const upload = multer({
  storage,
});
