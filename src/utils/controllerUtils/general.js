const checkPage = (page) => {
  const pageAsNumber = parseInt(page, 10);
  return !Number.isNaN(pageAsNumber);
};

const checkLimit = (limit) => {
  const limitAsNumber = parseInt(limit, 10);
  return !Number.isNaN(limitAsNumber);
};

export const hasPaginationParams = (page, limit) => {
  return checkPage(page) && checkLimit(limit);
};
