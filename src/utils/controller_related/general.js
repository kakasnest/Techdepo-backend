import { sep } from "path";

const checkPage = (page) => {
  const pageAsNumber = parseInt(page, 10);
  return (
    !Number.isNaN(pageAsNumber) &&
    pageAsNumber > 0 &&
    Number.isFinite(pageAsNumber)
  );
};

const checkLimit = (limit) => {
  const limitAsNumber = parseInt(limit, 10);
  return (
    !Number.isNaN(limitAsNumber) &&
    limitAsNumber > 0 &&
    Number.isFinite(limitAsNumber)
  );
};

export const checkPaginationParams = (page, limit) => {
  return checkPage(page) && checkLimit(limit);
};

export const createAPIPath = (path) => {
  return `${sep}api${sep}${path}`;
};
