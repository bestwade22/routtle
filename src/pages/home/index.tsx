import React from 'react';
import ButtonAppBar from '@/components/Header';
import RouletteTable from '@/components/RouletteTable';
import DynamicTabs from '@/components/Tabs';
import ChipsArray from '@/components/RecordList';

function Home() {
  return (
    <>
      <ButtonAppBar />
      <DynamicTabs />
    </>
  );
}

export default Home;
