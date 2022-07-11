import multer from "multer";
import { dirname, join } from "path";
import { access, mkdir } from "fs";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    const { fieldname } = file;

    const filePath = join("images", fieldname);
    access(filePath, (error) => {
      if (error) {
        mkdir(filePath, (error) => {
          next(null, filePath);
        });
      } else {
        next(null, filePath);
      }
    });
  },
  filename: (req, file, next) => {
    const { originalname } = file;
    const fileExtension = originalname.split(".").pop();
    const uniqueName = `${Date.now()}.${fileExtension}`;
    next(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, next) => {
    const { mimetype } = file;

    if (/^(image\/).+/.test(mimetype)) {
      next(null, true);
    } else {
      next(null, false);
    }
  },
});
