import { join, sep } from "path";
import { unlink, rm } from "fs";

const checkPage = (page) => {
  const pageAsNumber = parseInt(page, 10);
  return !Number.isNaN(pageAsNumber) && pageAsNumber > 0;
};

const checkLimit = (limit) => {
  const limitAsNumber = parseInt(limit, 10);
  return !Number.isNaN(limitAsNumber) && limitAsNumber > 0;
};

export const hasPaginationParams = ({ page, limit }) => {
  return checkPage(page) && checkLimit(limit);
};

export const getAPIPath = (path) => {
  const defaultPath = join(sep, "api", path);
  return defaultPath.replace(/\\/g, "/");
};

const isDefaultDir = (path) => {
  const dir = path.split("/").at(3);
  return dir === "default";
};

export const unlinkImage = (path, pathType = "fs") => {
  if (!isDefaultDir(path)) {
    if (pathType === "fs") {
      unlink(path, (unlinkError) => {
        if (unlinkError) console.log(unlinkError);
      });
    } else if (pathType === "db") {
      const filePath = path.split("/").slice(2).join(sep);
      unlink(filePath, (unlinkError) => {
        if (unlinkError) console.log(unlinkError);
      });
    }
  }
};

export const unlinkImageDir = (path) => {
  if (!isDefaultDir(path)) {
    const dirPath = path.split("/").slice(2, -1).join(sep);
    rm(dirPath, { recursive: true }, (error) => {
      if (error) console.log(error);
    });
  }
};
