import { Grid, Typography } from '@mui/material';
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
    index,
  }: {
    title: string;
    count: number[];
    betId: string;
    index: number;
  }) => {
    const payload = {
      stateName: 'dialog',
      value: {
        content: (
          <BetCard
            title={title}
            betId={betId}
            records={numberRecordState}
            betCount={count}
            betIndex={index}
          />
        ),
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
          handleClickBetBox={() =>
            handleClickBetBox({
              title,
              count: count[index],
              betId,
              index,
            })
          }
        />
      );
    },
    [betCount]
  );

  const renderTwoToOneBet = useCallback(
    (betId: string, title: string) => {
      const count = twoToOneCounts[betId];
      const index = ['1 to 18', 'Odd', 'Red'].includes(title) ? 0 : 1;
      const bgColor = betId === 'redBlackBet' ? title : '';
      return (
        <BetBox
          title={title}
          count={count[index]}
          listLength={numberRecordLength}
          absentCheck={getAbsentCheckState(betId)}
          handleClickBetBox={() =>
            handleClickBetBox({
              title,
              count: count[index],
              betId,
              index,
            })
          }
          bgColor={bgColor}
        />
      );
    },
    [twoToOneCounts]
  );
  const renderBetList = useCallback(
    (count: number[][], BetNameList: number[][], betId: string) => {
      const absentState = getAbsentCheckState(betId) || [];
      const columns = [
        {
          field: 'id',
          flex: 1,
        },
        {
          field: 'Absent',
          flex: 0.5,
          cellClassName: (params: { value: number }) => {
            if (params.value >= absentState[1]) {
              return 'gold';
            }
            if (params.value >= absentState[0]) {
              return 'silver';
            }
            return '';
          },
        },
        {
          field: 'Hit Rate',
          flex: 0.6,
        },
        {
          field: 'Hit',
          flex: 0.6,
        },
      ];
      const rows = count.map((countItem, index) => {
        const item = {
          id: BetNameList[index],
          Absent: countItem[0],
          'Hit Rate': percentage(countItem[1], numberRecordLength || 0),
          Hit: countItem[1],
        };
        return item;
      });
      const initialState = {
        sorting: {
          sortModel: [{ field: 'Absent', sort: 'desc' }],
        },
      };
      return (
        <BetList rows={rows} columns={columns} initialState={initialState} handleClickBetBox={handleClickBetBox} betId={betId}/>
      );
    },
    [twoToOneCounts]
  );

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
              {renderTwoToOneBet('eighteenNumBet', '1 to 18')}
            </Grid>
            <Grid item xs={2}>
              {renderTwoToOneBet('oddEvenBet', 'Odd')}
            </Grid>
            <Grid item xs={2}>
              {renderTwoToOneBet('redBlackBet', 'Red')}
            </Grid>
            <Grid item xs={2}>
              {renderTwoToOneBet('redBlackBet', 'Black')}
            </Grid>
            <Grid item xs={2}>
              {renderTwoToOneBet('oddEvenBet', 'Even')}
            </Grid>
            <Grid item xs={2}>
              {renderTwoToOneBet('eighteenNumBet', '19 to 36')}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={3}
          sx={{
            '& .silver': {
              backgroundColor:  '#C0C0C0',
            },
            '& .gold': {
              backgroundColor: '#FFD700',
            },
          }}
        >
          <Typography gutterBottom variant="subtitle2" component="div">
            Corner Numbers
          </Typography>
          {renderBetList(
            betCount.cornerNumbers,
            cornerNumbers,
            'cornerNumbers'
          )}
          <Typography gutterBottom variant="subtitle2" component="div">
            Split Numbers
          </Typography>
          {renderBetList(betCount.splitNumbers, splitNumbers, 'splitNumbers')}
        </Grid>
      </Grid>
    </>
  );
}
