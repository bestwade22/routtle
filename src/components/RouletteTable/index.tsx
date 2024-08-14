import { Grid } from '@mui/material';
import {
  columnNumbers,
  lineNumbers,
  rouletteNumbers,
  streetNumbers,
  twelveNumbers,
} from '@/static/staticNumbers';
import CustomGrid from './CustomGrid';
import NumberBox from './NumberBox';
import { useRouletteContext } from '@/contexts/RouletteContext';
import { useCallback } from 'react';
import BetBox from './BetBox';

type RouletteTablePropType = {
  tableId: number;
  isAddRecord?: boolean;
};

export default function RouletteTable(props: RouletteTablePropType) {
  const { tableId, isAddRecord = false } = props;
  const { state, dispatch } = useRouletteContext();

  const renderNumber = useCallback(
    (data: any, index?: number) => {
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
        />
      );
    },
    [isAddRecord]
  );
  const renderTwelveNum = useCallback((data: any, index?: number) => {
    let title = '';
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
    return <BetBox title={title} count={1} />;
  }, []);

  const renderLineNum = useCallback((data: any, index: number) => {
    let title = `line ${index + 1}`;
    return <BetBox title={title} count={1} />;
  }, []);

  const renderStreetNum = useCallback((data: any, index: number) => {
    let title = `str ${index + 1}`;
    return <BetBox title={title} ncount={1} />;
  }, []);
  const renderColNum = useCallback((data: any, index: number) => {
    let title = `Col ${index + 1}`;
    return <BetBox title={title} count={1} />;
  }, []);
  const renderRedBlackBet = useCallback(
    (title: string, bgColor: string) => {
      return <BetBox title={title} count={1} bgColor={bgColor}/>;
    },
    []
  );
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              {renderNumber({ num: 0, color: 'green' })}
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
            <Grid item xs={2}>{renderRedBlackBet('Red', 'red')}</Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>{renderRedBlackBet('Black', 'black')}</Grid>

          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
