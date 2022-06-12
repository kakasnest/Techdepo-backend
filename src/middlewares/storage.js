import multer from "multer";
import { dirname, join } from "path";
import { access, mkdir } from "fs";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    const { fieldname } = file;
    const {
      body: { name },
    } = req;

    try {
      if (typeof name !== "undefined") {
        const parsedName = name
          .normalize("NFD")
          .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "")
          .toLowerCase();

        const filePath = join(dirname("."), "images", fieldname, parsedName);
        access(filePath, (error) => {
          if (error) {
            mkdir(filePath, () => {
              next(null, filePath);
            });
          } else {
            next(null, filePath);
          }
        });
      } else {
        throw new Error("Name of product is required");
      }
    } catch (err) {
      return next(err);
    }
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
