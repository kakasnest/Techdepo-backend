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
