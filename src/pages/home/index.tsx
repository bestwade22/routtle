import React from 'react';
import ButtonAppBar from '@/components/Header';
import RouletteTable from '@/components/RouletteTable';
import DynamicTabs from '@/components/Tabs';

function Home() {
  return (
    <>
      <ButtonAppBar />
      <DynamicTabs>
        <RouletteTable />
      </DynamicTabs> 
    </>
  );
}

export default Home;
