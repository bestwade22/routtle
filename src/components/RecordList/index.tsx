import { Chip, IconButton, Paper } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { useRouletteContext } from '@/contexts/RouletteContext';
import BackspaceIcon from '@mui/icons-material/Backspace';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

const useStyles: any = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'nowrap',
    listStyle: 'none',
    margin: '10px',
    padding: '0',
    overflow: 'auto',
    scrollbarWidth: 'none',
  },
}));
type RecordListPropType = {
  tableId: number;
  isAddRecord: boolean;
  setIsAddRecord: React.Dispatch<React.SetStateAction<boolean>>;
};
const RecordList = (props: RecordListPropType) => {
  const { tableId, isAddRecord, setIsAddRecord } = props;
  const classes = useStyles();
  const { state, dispatch } = useRouletteContext();
  const rouletteTableState = state.rouletteTables.find(
    (item) => item.id === tableId
  );
  const recordInOrder = [...(rouletteTableState?.record || [])].reverse();
  const handleDeleteRecord = () => {
    dispatch({
      type: 'DELETE_RECORD',
      payload: { tableId },
    });
  };
  const toggleAddRecord = () => {
    setIsAddRecord((prev) => !prev);
  };
  return (
    <Paper component="ul" className={classes.root}>
      <li key="btn-add">
        <IconButton
          size="small"
          component="span"
          onClick={() => toggleAddRecord()}
        >
          {isAddRecord ? <PlaylistRemoveIcon /> : <PlaylistAddIcon />}
        </IconButton>
      </li>
      <li key="btn-delete">
        <IconButton
          size="small"
          component="span"
          onClick={() => {
            handleDeleteRecord();
          }}
        >
          <BackspaceIcon />
        </IconButton>
      </li>
      {/* {rouletteTableState?.record
        .slice(0)
        .reverse() */}
      {recordInOrder.map((data, index) => {
        return (
          <li key={index}>
            <Chip
              label={data.num}
              className={classes.chip}
              style={{
                backgroundColor: data.color,
                color: '#fff',
              }}
            />
          </li>
        );
      })}
    </Paper>
  );
};
export default RecordList;
