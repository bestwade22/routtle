// src/Tabs.tsx
import React, {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useRouletteContext } from '@/contexts/RouletteContext';
import RecordList from '../RecordList';
import RouletteTable from '../RouletteTable';
// import RouletteTable from 'components/rouletteTable';

interface TabPanelProps {
  children?: ReactNode | undefined;
  // index: number;
}

export default function DynamicTabs(props: TabPanelProps) {
  const { children } = props;
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
    if (value === tableId.toString()) {
      setValue(rouletteTablesState[0].id.toString());
    }
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
                        handleRemoveTab(table.id);
                        e.stopPropagation();
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                }
              />
            ))}
            <Tab onClick={handleAddTab} label="Add Tab" value={'remove'} />
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
