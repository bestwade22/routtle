import { percentage } from './percentage';

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

export const betCalculator = (betId: string) => {
  let result = { percentage: '0%', missRate: 0, hitRate: 0 };

  switch (betId) {
    case 'twelveNumbers':
      result = {
        percentage: percentage(12, 37),
        missRate: 25 / 37,
        hitRate: 12 / 37,
      };
      break;
    case 'lineNumbers':
      result = {
        percentage: percentage(6, 37),
        missRate: 31 / 37,
        hitRate: 6 / 37,
      };
      break;
    case 'streetNumbers':
      result = {
        percentage: percentage(3, 37),
        missRate: 34 / 37,
        hitRate: 3 / 37,
      };
      break;
    case 'columnNumbers':
      result = {
        percentage: percentage(12, 37),
        missRate: 25 / 37,
        hitRate: 12 / 37,
      };
      break;
    case 'splitNumbers':
      result = {
        percentage: percentage(2, 37),
        missRate: 35 / 37,
        hitRate: 2 / 37,
      };
      break;
    case 'cornerNumbers':
      result = {
        percentage: percentage(4, 37),
        missRate: 33 / 37,
        hitRate: 4 / 37,
      };
      break;
    case 'eighteenNumBet':
      result = {
        percentage: percentage(18, 37),
        missRate: 19 / 37,
        hitRate: 18 / 37,
      };
      break;
    case 'oddEvenBet':
      result = {
        percentage: percentage(18, 37),
        missRate: 19 / 37,
        hitRate: 18 / 37,
      };
      break;
    case 'redBlackBet':
      result = {
        percentage: percentage(18, 37),
        missRate: 19 / 37,
        hitRate: 18 / 37,
      };
      break;
    default:
      break;
  }
  return result;
};
