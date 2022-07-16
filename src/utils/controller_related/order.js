export const isQuantityValid = (quantity) => {
  return (
    Number.isInteger(quantity) && quantity > 0 && Number.isFinite(quantity)
  );
};
