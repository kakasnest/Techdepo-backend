import { join, sep } from "path";
import { unlink } from "fs";

const checkPage = (page) => {
  const pageAsNumber = parseInt(page, 10);
  return !Number.isNaN(pageAsNumber) && pageAsNumber > 0;
};

const checkLimit = (limit) => {
  const limitAsNumber = parseInt(limit, 10);
  return !Number.isNaN(limitAsNumber) && limitAsNumber > 0;
};

export const hasPaginationParams = (page, limit) => {
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

export const hasUpdateProp = (prop) => {
  return typeof prop !== "undefined";
};

export const hasUpdateProps = (object) => {
  const props = Object.keys(object);
  const results = props.map((prop) => {
    return hasUpdateProp(object[prop]);
  });

  if (!results.includes(false)) return true;
  else return false;
};
