import { rouletteNumbers, staticNumbers } from '@/static/staticNumbers';

export const recordCount = (record: number[] = []) => {
  const recordInOrder = [...record].reverse();
  let counts: {
    [key: string]: number[][];
  } = {
    numberCount: new Array(37).fill([0, 0]),
    twelveNumbers: new Array(3).fill([0, 0]),
    columnNumbers: new Array(3).fill([0, 0]),
    lineNumbers: new Array(6).fill([0, 0]),
    streetNumbers: new Array(12).fill([0, 0]),
    splitNumbers: new Array(57).fill([0, 0]),
    cornerNumbers: new Array(22).fill([0, 0]),
  };
  const keyOfCounts = Object.keys(counts);

  for (let index = 0; index < recordInOrder.length; index++) {
    //let checkNextNum = false;
    for (var bet of keyOfCounts) {
      const newBetCount = counts[bet].map((countItem: number[], i) => {
        let newAbsentCount = countItem[0];
        let newHitCount = countItem[1];
        const AbsentRecordCheck =
          bet === 'numberCount'
            ? recordInOrder[index] !== i
            : !staticNumbers[bet][i].includes(recordInOrder[index]);
        const hitRecordCheck =
          bet === 'numberCount'
            ? recordInOrder[index] === i
            : staticNumbers[bet][i].includes(recordInOrder[index]);
        if (AbsentRecordCheck && countItem[0] === index) {
          newAbsentCount = countItem[0] + 1;
          //checkNextNum = true;
        }
        if (hitRecordCheck) {
          newHitCount = countItem[1] + 1;
        }
        return [newAbsentCount, newHitCount];
      });
      counts[bet] = newBetCount;
    }
    // if (!checkNextNum) {
    //   break;
    // }
  }

  return counts;
};

export const twoToOneBetsCount = (record: number[] = []) => {
  const recordInOrder = [...record].reverse();
  let counts: {
    [key: string]: number[][];
  } = {
    oddEvenBet: new Array(2).fill([0, 0]),
    eighteenNumBet: new Array(2).fill([0, 0]),
    redBlackBet: new Array(2).fill([0, 0]),
  };
  const keyOfCounts = Object.keys(counts);

  for (let index = 0; index < recordInOrder.length; index++) {
    for (var bet of keyOfCounts) {
      let absentCheck = false;
      let hitCheck = false;
      const newBetCount = counts[bet].map((countItem: number[], i) => {
        let newAbsentCount = countItem[0];
        let newHitCount = countItem[1];
        switch (bet) {
          case 'oddEvenBet':
            absentCheck = recordInOrder[index] % 2 === i;
            hitCheck = !absentCheck;
            break;
          case 'eighteenNumBet':
            absentCheck = i
              ? recordInOrder[index] <= 18 
              : recordInOrder[index] > 18;
            hitCheck = !absentCheck;
            break;
          case 'redBlackBet':
            const numberColor =
              rouletteNumbers[recordInOrder[index] - 1]?.color;
            absentCheck =
              i === 0 ? numberColor !== 'red' : numberColor !== 'black';
            hitCheck =
              i === 0 ? numberColor !== 'black' : numberColor !== 'red';
            break;
          default:
            break;
        }
        if ((absentCheck || recordInOrder[index] === 0) && newAbsentCount === index) {
          newAbsentCount = newAbsentCount + 1;
        }
        if (hitCheck && recordInOrder[index] !== 0) {
          newHitCount = newHitCount + 1;
        }
        return [newAbsentCount, newHitCount];
      });
      counts[bet] = newBetCount;
    }
  }

  return counts;
};

export const hitCounts = (
  record: number[] = [],
  betId: string,
  betIndex: number
) => {
  const recordInOrder = [...record].reverse();
  const recordLength = recordInOrder.length;
  let hitCounts = [];
  let hitCount = 0;
  for (let index = 0; index < recordLength; index++) {
    let hitCheck = false;
    switch (betId) {
      case 'oddEvenBet':
        hitCheck = recordInOrder[index] % 2 !== betIndex;
        break;
      case 'eighteenNumBet':
        hitCheck = betIndex
          ? recordInOrder[index] > 18
          : recordInOrder[index] <= 18;
        break;
      case 'redBlackBet':
        const numberColor = rouletteNumbers[recordInOrder[index] - 1]?.color;
        hitCheck =
          index === 0 ? numberColor === 'red' : numberColor === 'black';
        break;
      default:
        hitCheck =
          betId === 'numberCount'
            ? recordInOrder[index] === index
            : staticNumbers[betId][betIndex].includes(recordInOrder[index]);
        break;
    }
    if (hitCheck) {
      hitCount = hitCount + 1;
    }
    if ((index + 1) % 10 === 0 || index + 1 === recordLength) {
      hitCounts.push(hitCount);
    }
  }
  return hitCounts;
};
