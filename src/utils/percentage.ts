export const percentage = (num: number, length: number) => {
  var result = Number(num / length).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 1,
  });
  return result;
};
