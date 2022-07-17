export const isRatingValid = (rating) => {
  return Number.isInteger(rating) && !(rating < 1) && !(rating > 5);
};
