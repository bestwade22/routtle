import { rouletteNumbers, staticNumbers } from '@/static/staticNumbers';

export const recordCount = (record: number[] = []) => {
  const recordInOrder = [...record].reverse();
  let counts: {
    [key: string]: number[];
  } = {
    numberCount: new Array(37).fill(0),
    twelveNumbers: new Array(3).fill(0),
    columnNumbers: new Array(3).fill(0),
    lineNumbers: new Array(6).fill(0),
    streetNumbers: new Array(12).fill(0),
  };
  const keyOfCounts = Object.keys(counts);

  for (let index = 0; index < recordInOrder.length; index++) {
    let checkNextNum = false;
    for (var bet of keyOfCounts) {
      const newBetCount = counts[bet].map((count: number, i) => {
        let newCount = count;
        const recordCheck =
          bet === 'numberCount'
            ? recordInOrder[index] !== i
            : !staticNumbers[bet][i].includes(recordInOrder[index]);
        if (recordCheck && count === index) {
          newCount = count + 1;
          checkNextNum = true;
        }
        return newCount;
      });
      counts[bet] = newBetCount;
    }
    if (!checkNextNum) {
      break;
    }
  }

  return counts;
};

export const twoToOneBetsCount = (record: number[] = []) => {
  const recordInOrder = [...record].reverse();
  let counts: {
    [key: string]: number[];
  } = {
    oddEvenBet: new Array(2).fill(0),
    eighteenNumBet: new Array(2).fill(0),
    redBlackBet: new Array(2).fill(0),
  };
  const keyOfCounts = Object.keys(counts);

  for (let index = 0; index < recordInOrder.length; index++) {
    let checkNextNum = false;
    for (var bet of keyOfCounts) {
      let recordCheck = false;

      const newBetCount = counts[bet].map((count: number, i) => {
        let newCount = count;
        switch (bet) {
          case 'oddEvenBet':
            recordCheck = recordInOrder[index] % 2 === i;
            break;
          case 'eighteenNumBet':
            recordCheck =
              i ? recordInOrder[index] > 18 : recordInOrder[index] <= 18;
            break;
          case 'redBlackBet':
            const numberColor = rouletteNumbers[recordInOrder[index]-1]?.color
            recordCheck =
              i === 0 ? (numberColor === "black") : (numberColor === "red");
            break;
          default:
            break;
        }
        if (recordCheck && count === index) {
          newCount = count + 1;
          checkNextNum = true;
        }
        return newCount;
      });
      counts[bet] = newBetCount;
    }
    if (!checkNextNum) {
      break;
    }
  }

  return counts;
};
