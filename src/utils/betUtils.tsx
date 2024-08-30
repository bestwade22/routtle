import { percentage } from "./percentage";

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
    default:
      break;
  }
  return title;
};


export const betProbability = (betId: string) => {
  let probability = '0%';

  switch (betId) {
    case 'twelveNumbers':
      probability = percentage(12, 37)
      break;
    case 'lineNumbers':
      probability = percentage(6, 37)
      break;
    case 'streetNumbers':
      probability = percentage(3, 37)
      break;
    case 'columnNumbers':
      probability = percentage(12, 37)
      break;
    default:
      break;
  }
  return probability;
};
