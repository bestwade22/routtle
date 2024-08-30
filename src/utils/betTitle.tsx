export const betTitle = (betId: string, index: number) => {
  let title = '';

  switch (betId) {
    case 'twelveNumbers':
      switch (index) {
        case 0:
          title = '1st 12';
          break;
        case 1:
          title = '2nd 12';
          break;
        case 2:
          title = '3rd 12';
          break;
        default:
          break;
      }
      break;
    case 'lineNumbers':
      title = `L${index + 1}`;
      break;
    case 'streetNumbers':
      title = `S${index + 1}`;
      break;
    case 'columnNumbers':
      title = `Col ${index + 1}`;
      break;
    case 'lineNumbers':
      title = `L${index + 1}`;
      break;

    default:
      break;
  }
  return title;
};
