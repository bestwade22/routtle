// src/Tabs.tsx
import React, { ReactNode, useCallback, useState } from 'react';
import Tab from '@mui/material/Tab';
import { Box, Button, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useRouletteContext } from '@/contexts/RouletteContext';
import RecordList from '../RecordList';
import RouletteTable from '../RouletteTable';
import { defaultDialog } from '@/static/defaultContents';
// import RouletteTable from 'components/rouletteTable';

interface TabPanelProps {
  children?: ReactNode | undefined;
  // index: number;
}

export default function DynamicTabs(props: TabPanelProps) {
  const {} = props;
  const [value, setValue] = useState('1');
  const [isAddRecord, setIsAddRecord] = useState(false);
  const { state, dispatch } = useRouletteContext();
  const rouletteTablesState = state.rouletteTables;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault;
    setValue(newValue);
  };

  const handleAddTab = () => {
    const lastTableIndex = rouletteTablesState.length - 1;
    const newTableId = rouletteTablesState[lastTableIndex].id + 1;
    dispatch({
      type: 'ADD_ROULETTE_TABLE',
      payload: {
        id: newTableId,
        title: `Table ${newTableId}`,
        numberRecord: [],
        record: [],
        lastNumber: null,
      },
    });
    setValue(newTableId.toString());
  };

  const handleRemoveTab = (tableId: number) => {
    console.log(tableId);
    dispatch({
      type: 'REMOVE_ROULETTE_TABLE',
      payload: {
        id: tableId,
      },
    });
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        stateName: 'dialog',
        value: defaultDialog,
      },
    });
    if (value === tableId.toString()) {
      setValue(rouletteTablesState[0].id.toString());
    }
  };
  const openConfirmDialog = (tableId: number) => {
    const payload = {
      stateName: 'dialog',
      value: {
        content: (
          <Box m={4}>
            <Box>{`Confirm remove Table${tableId}`}</Box>
            <Button onClick={() => handleRemoveTab(tableId)}>
              Remove
            </Button>
          </Box>
        ),
        enable: true,
      },
    };
    dispatch({
      type: 'UPDATE_STATE',
      payload: payload,
    });
  };

  const renderRouletteTable = useCallback(
    (tableId: number) => (
      <RouletteTable tableId={tableId} isAddRecord={isAddRecord} />
    ),
    [isAddRecord]
  );
  const renderRecordList = useCallback(
    (tableId: number) => (
      <RecordList
        tableId={tableId}
        isAddRecord={isAddRecord}
        setIsAddRecord={setIsAddRecord}
      />
    ),
    [isAddRecord]
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="lab API tabs example"
          >
            {rouletteTablesState.map((table) => (
              <>
                <Tab
                  key={table.id}
                  value={table.id.toString()}
                  label={
                    <Box display="flex" alignItems="center">
                      {table.title}
                      <IconButton
                        size="small"
                        component="span"
                        onClick={(e) => {
                          openConfirmDialog(table.id);
                          e.stopPropagation();
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  }
                />
                <Divider orientation="vertical" variant="middle" flexItem />
              </>
            ))}
            <Tab
              onClick={handleAddTab}
              label={<AddCircleOutlineIcon />}
              value={'remove'}
              sx={{ minWidth: 50 }}
            />
          </TabList>
        </Box>
        {rouletteTablesState.map((table) => (
          <TabPanel key={table.id} value={table.id.toString()}>
            <Box>
              {renderRecordList(table.id)}
              {renderRouletteTable(table.id)}
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
