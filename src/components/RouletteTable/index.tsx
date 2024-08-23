import { Grid } from '@mui/material';
import {
  columnNumbers,
  cornerNumbers,
  lineNumbers,
  rouletteNumbers,
  splitNumbers,
  streetNumbers,
  twelveNumbers,
} from '@/static/staticNumbers';
import CustomGrid from './CustomGrid';
import NumberBox from './NumberBox';
import { useRouletteContext } from '@/contexts/RouletteContext';
import { useCallback, useEffect, useState } from 'react';
import BetBox from './BetBox';
import { recordCount, twoToOneBetsCount } from '@/utils/count';
import BetList from './BetList';
import { percentage } from '@/utils/percentage';

type RouletteTablePropType = {
  tableId: number;
  isAddRecord?: boolean;
};

export default function RouletteTable(props: RouletteTablePropType) {
  const { tableId, isAddRecord = false } = props;
  const { state, dispatch } = useRouletteContext();

  const rouletteTableState = state.rouletteTables.find(
    (item) => item.id === tableId
  );
  const numberRecordState = rouletteTableState?.numberRecord;
  const numberRecordLength = numberRecordState?.length;

  // const { countState, setCountState }: any = useState(
  //   recordCount(numberRecordState)
  // );
  const betCount = recordCount(numberRecordState);
  const twoToOneCounts = twoToOneBetsCount(numberRecordState);
  console.log(betCount);

  const renderNumber = useCallback(
    (data: any, index: number) => {
      const numCountIdx = data.num === 0 ? 0 : index + 1;
      const handleAddRecord = () => {
        if (isAddRecord) {
          dispatch({
            type: 'ENTER_RECORD',
            payload: { tableId, recordItem: data },
          });
        }
      };
      return (
        <NumberBox
          num={data.num}
          color={data.color}
          handleAddRecord={handleAddRecord}
          count={betCount?.numberCount[numCountIdx]}
          listLength={numberRecordLength}
        />
      );
    },
    [isAddRecord, betCount, numberRecordLength]
  );
  const renderTwelveNum = useCallback(
    (data: any, index: number) => {
      let title = '';
      const count = betCount['twelveNumbers'];
      switch (index) {
        case 0:
          title = '1st dozens';
          break;
        case 1:
          title = '2nd dozens';
          break;
        case 2:
          title = '3rd dozens';
          break;
        default:
          break;
      }
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
        />
      );
    },
    [betCount]
  );

  const renderLineNum = useCallback(
    (data: any, index: number) => {
      let title = `line ${index + 1}`;
      const count = betCount['lineNumbers'];
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
        />
      );
    },
    [betCount]
  );

  const renderStreetNum = useCallback(
    (data: any, index: number) => {
      let title = `str ${index + 1}`;
      const count = betCount['streetNumbers'];
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
        />
      );
    },
    [betCount]
  );
  const renderColNum = useCallback(
    (data: any, index: number) => {
      let title = `Col ${index + 1}`;
      const count = betCount['columnNumbers'];
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
        />
      );
    },
    [betCount]
  );
  const renderRedBlackBet = useCallback(
    (title: string, bgColor: string) => {
      const count = twoToOneCounts.redBlackBet;
      const index = title === 'Red' ? 0 : 1;
      return <BetBox title={title} count={[count[index]]} bgColor={bgColor} />;
    },
    [twoToOneCounts]
  );
  const renderOddEvenBet = useCallback(
    (title: string) => {
      const count = twoToOneCounts.oddEvenBet;
      const index = title === 'Odd' ? 0 : 1;
      return <BetBox title={title} count={[count[index]]} />;
    },
    [twoToOneCounts]
  );
  const renderEighteenNumBet = useCallback(
    (title: string) => {
      const count = twoToOneCounts.eighteenNumBet;
      const index = title === '1 to 18' ? 0 : 1;
      return <BetBox title={title} count={[count[index]]} />;
    },
    [twoToOneCounts]
  );
  const renderBetList = useCallback(
    (count: number[][], BetNameList: number[][]) => {
      const columns = [
        {
          field: 'id',
          flex: 1,
        },
        {
          field: 'Consecutive',
          flex: 0.5,
        },
        {
          field: 'Hit Rate',
          flex: 0.6,
        },
      ];
      const rows = count.map((countItem, index) => {
        const item = {
          id: BetNameList[index],
          Consecutive: countItem[0],
          'Hit Rate': percentage(countItem[1], numberRecordLength || 0),
        };
        return item;
      });
      return <BetList rows={rows} columns={columns} />;
    },
    [twoToOneCounts]
  );

  // useEffect(() => {
  //   setCountState(recordCount(numberRecordState));

  //   return () => {};
  // }, [numberRecordState]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              {renderNumber({ num: 0, color: 'green' }, 0)}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <CustomGrid
            list={twelveNumbers}
            column
            renderContent={renderTwelveNum}
          />
        </Grid>
        <Grid item xs={2}>
          <CustomGrid list={lineNumbers} column renderContent={renderLineNum} />
        </Grid>
        <Grid item xs={6}>
          <CustomGrid
            list={rouletteNumbers}
            cols={3}
            renderContent={renderNumber}
          />
        </Grid>
        <Grid item xs={2}>
          <CustomGrid
            list={streetNumbers}
            column
            renderContent={renderStreetNum}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              <CustomGrid
                list={columnNumbers}
                cols={3}
                renderContent={renderColNum}
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={2}>
              {renderEighteenNumBet('1 to 18')}
            </Grid>
            <Grid item xs={2}>
              {renderOddEvenBet('Odd')}
            </Grid>
            <Grid item xs={2}>
              {renderRedBlackBet('Red', 'red')}
            </Grid>
            <Grid item xs={2}>
              {renderRedBlackBet('Black', 'black')}
            </Grid>
            <Grid item xs={2}>
              {renderOddEvenBet('Event')}
            </Grid>
            <Grid item xs={2}>
              {renderEighteenNumBet('19 to 36')}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {renderBetList(betCount.cornerNumbers, cornerNumbers)}
          {renderBetList(betCount.splitNumbers, splitNumbers)}
        </Grid>
      </Grid>
    </>
  );
}
