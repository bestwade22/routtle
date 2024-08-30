import { Grid } from '@mui/material';

type CustomGridType = {
  list: any;
  cols?: number;
  column?: boolean;
  renderContent?: ({
    betId,
    data,
    index,
  }: {
    betId: string;
    data: any;
    index: number;
  }) => JSX.Element;
  betId?: string;
};
const CustomGrid = (props: CustomGridType) => {
  const { list, cols, column = false, renderContent, betId = '' } = props;
  const tableCol = cols ?? list.length;
  const size = 12 / tableCol;
  const direction = column ? 'column' : 'row';
  return (
    <Grid
      container
      direction={direction}
      justifyContent="space-between"
      alignItems="center"
      style={{ height: '100%' }}
    >
      {list.map((data: any, index: number) => {
        return (
          <Grid
            item
            xs={size}
            alignItems="center"
            justifyContent="center"
            key={index}
            width={'100%'}
          >
            {renderContent && renderContent({ betId, data, index })}
            {/* <Box
                height="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Box>{data.num ? data.num : index}</Box>
              </Box> */}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CustomGrid;
