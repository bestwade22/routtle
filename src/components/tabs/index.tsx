// src/Tabs.tsx
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
}

export default function DynamicTabs() {
  const [tabs, setTabs] = useState<{ id: number; label: string }[]>([
    { id: 0, label: 'Tab 1' },
  ]);
  const [value, setValue] = useState('0');
  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTabId = tabs.length + 1;
    setTabs((prevTabs) => [
      ...prevTabs,
      { id: newTabId, label: `Tab ${newTabId}` },
    ]);
    setValue(newTabId.toString());
  };

  const handleRemoveTab = (tabId: number) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    setValue(
      Math.max(0, tabs.findIndex((tab) => tab.id === tabId) - 1).toString()
    );
  };
  const handleChangeIndex = (index: number) => {
    setValue(index.toString());
  };
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
            {tabs.map((tab) => (
              <Tab value={tab.id.toString()} label={tab.label} />
            ))}
            <Tab onClick={handleAddTab} label="Add Tab" />
          </TabList>
        </Box>
        {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={parseInt(value)}
          onChangeIndex={handleChangeIndex}
        ></SwipeableViews> */}
        {tabs.map((tab) => (
          <TabPanel value={tab.id.toString()}>
            {tab.label}
            <button onClick={() => handleRemoveTab(tab.id)}>Remove Tab</button>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
