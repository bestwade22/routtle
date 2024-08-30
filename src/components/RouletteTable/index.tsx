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
import { useCallback } from 'react';
import BetBox from './BetBox';
import { recordCount, twoToOneBetsCount } from '@/utils/count';
import BetList from './BetList';
import { percentage } from '@/utils/percentage';
import { betTitle } from '@/utils/betUtils';
import BetCard from './BetCard';

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
  const absentCheckState = state.settings.absentCheck;
  // const { countState, setCountState }: any = useState(
  //   recordCount(numberRecordState)
  // );
  const betCount = recordCount(numberRecordState);
  const twoToOneCounts = twoToOneBetsCount(numberRecordState);
  console.log(twoToOneCounts);
  const getAbsentCheckState = (id: string) => {
    return absentCheckState.find((i) => i.id === id)?.check;
  };
  const handleClickBetBox = ({
    title,
    count,
    betId,
  }: {
    title: string;
    count: number[];
    betId: string;
  }) => {
    const payload = {
      stateName: 'dialog',
      value: {
        content: <BetCard title={title} betId={betId} records={numberRecordState} betCount={count}/>,
        enable: true,
      },
    };
    dispatch({
      type: 'UPDATE_STATE',
      payload: payload,
    });
  };
  const renderNumber = useCallback(
    ({ data, index }: { data: any; index: number }) => {
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
          absentCheck={getAbsentCheckState('rouletteNumbers')}
        />
      );
    },
    [isAddRecord, betCount, numberRecordLength]
  );
  const renderBets = useCallback(
    ({ betId, index }: { betId: string; index: number }) => {
      let title = betTitle(betId, index);
      const id = betId;
      const count = betCount[id];
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
          absentCheck={getAbsentCheckState(id)}
          handleClickBetBox={() => handleClickBetBox({
            title,
            count: count[index],
            betId,
          })}
        />
      );
    },
    [betCount]
  );

  const renderRedBlackBet = useCallback(
    (title: string, bgColor: string) => {
      const id = 'redBlackBet';
      const count = twoToOneCounts[id];
      const index = title === 'Red' ? 0 : 1;
      return (
        <BetBox
          title={title}
          count={count[index]}
          bgColor={bgColor}
          listLength={numberRecordLength}
          absentCheck={getAbsentCheckState(id)}
        />
      );
    },
    [twoToOneCounts]
  );
  const renderOddEvenBet = useCallback(
    (title: string) => {
      const id = 'oddEvenBet';
      const count = twoToOneCounts[id];
      const index = title === 'Odd' ? 0 : 1;
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
          absentCheck={getAbsentCheckState(id)}
        />
      );
    },
    [twoToOneCounts]
  );
  const renderEighteenNumBet = useCallback(
    (title: string) => {
      const id = 'eighteenNumBet';
      const count = twoToOneCounts[id];
      const index = title === '1 to 18' ? 0 : 1;
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
          absentCheck={getAbsentCheckState(id)}
        />
      );
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
          field: 'Absent',
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
          Absent: countItem[0],
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
              {renderNumber({ data: { num: 0, color: 'green' }, index: 0 })}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <CustomGrid
            list={twelveNumbers}
            column
            renderContent={renderBets}
            betId="twelveNumbers"
          />
        </Grid>
        <Grid item xs={2}>
          <CustomGrid
            list={lineNumbers}
            column
            renderContent={renderBets}
            betId="lineNumbers"
          />
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
            renderContent={renderBets}
            betId="streetNumbers"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              <CustomGrid
                list={columnNumbers}
                cols={3}
                renderContent={renderBets}
                betId="columnNumbers"
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
