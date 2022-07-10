import { sep, join, dirname } from "path";
import { unlink } from "fs";

const checkPage = (page) => {
  const pageAsNumber = parseInt(page, 10);
  return !Number.isNaN(pageAsNumber) && pageAsNumber > 0;
};

const checkLimit = (limit) => {
  const limitAsNumber = parseInt(limit, 10);
  return !Number.isNaN(limitAsNumber) && limitAsNumber > 0;
};

export const checkPaginationParams = (page, limit) => {
  return checkPage(page) && checkLimit(limit);
};

const isDefaultDir = (path) => {
  const dir = path.split(sep).at(-2);
  return dir === "default";
};

export const unlinkImage = (path) => {
  if (isDefaultDir(path)) return;

  //Remove /api from image path
  const pathToImage = join(dirname("."), path.substring(4));

  unlink(pathToImage, (error) => {
    if (error) console.log(error);
  });
};

export const createAPIPath = (path) => {
  return `${sep}api${sep}${path}`;
};
