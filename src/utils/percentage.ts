export const percentage = (num: number, length: number) => {
  var result = Number(num / length).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 1,
  });
  return result;
};


export const powPercentage = (num: number, times: number, digits = 2) => {
  var result = Number(num ** times).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: digits,
  });
  return result;
};
