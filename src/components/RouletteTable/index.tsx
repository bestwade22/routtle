import { Grid } from '@mui/material';
import { rouletteNumbers, twelveNumbers } from '@/static/staticNumbers';
import CustomGrid from './CustomGrid';
import NumberBox from './NumberBox';
import { useRouletteContext } from '@/contexts/RouletteContext';
import { useCallback } from 'react';

type RouletteTablePropType = {
  tableId: number;
  isAddRecord?: boolean;
};

export default function RouletteTable(props: RouletteTablePropType) {
  const { tableId, isAddRecord = false } = props;
  const { state, dispatch } = useRouletteContext();

  const renderNumber = useCallback((data: any) => {
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
  }, [isAddRecord]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              {renderNumber({ num: 0, color: 'green' })}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <CustomGrid list={twelveNumbers} column />
        </Grid>
        <Grid item xs={2}>
          col2
        </Grid>
        <Grid item xs={6}>
          <CustomGrid
            list={rouletteNumbers}
            cols={3}
            renderContent={renderNumber}
          />
        </Grid>
        <Grid item xs={2}>
          col4
        </Grid>
      </Grid>
    </>
  );
}
