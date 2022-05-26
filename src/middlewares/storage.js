import multer from "multer";
import { dirname, join } from "path";
import { access, mkdir } from "fs";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    const filePath = join(dirname("."), "images", file.fieldname);

    access(filePath, (error) => {
      if (error) {
        mkdir(filePath, () => {
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
