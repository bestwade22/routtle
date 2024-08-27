export const absentBgColor = (count: number, absentCheck: number[]) => {
  const silver = '#C0C0C0';
  const gold = '#FFD700';
  let bgColor = '';
  if (count >= absentCheck[1] && absentCheck[1]) {
    bgColor = gold;
    return bgColor;
  }
  if (count >= absentCheck[0] && absentCheck[0]) {
    bgColor = silver;
    return bgColor;
  }
  return bgColor;
};
