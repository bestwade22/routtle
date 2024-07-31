import React from 'react';
import { Grid } from '@mui/material';

export default function RouletteTable() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          col1
        </Grid>
        <Grid item xs={1}>
          col2
        </Grid>
        <Grid item xs={9}>
          col3
        </Grid>
        <Grid item xs={1}>
          col4
        </Grid>
      </Grid>
    </>
  );
}
