const convertToCents = (paymentAmount, factor = 100) => {
  return Math.round(paymentAmount * factor);
};

export default convertToCents;
