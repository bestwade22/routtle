import { staticNumbers } from '@/static/staticNumbers';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
type BetListType = {
  rows: any;
  columns: any;
  initialState?: any;
  handleClickBetBox?: any;
  betId: string;
};

function BetList(props: BetListType) {
  const { rows, columns, initialState, handleClickBetBox, betId } = props;
  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const betIndex = staticNumbers[betId].indexOf(params.id);
    const count = [params.row['Absent'], params.row['Hit']];
    handleClickBetBox({
      title: params.row.id,
      count,
      betId,
      index: betIndex,
    });
  };
  return (
    <div style={{ height: '18rem', width: '100%' }}>
      <DataGrid
        rows={rows}
        onRowClick={handleRowClick}
        columns={columns}
        initialState={initialState}
      />
    </div>
    // <List
    //   sx={{
    //     width: '100%',
    //     maxWidth: 360,
    //     bgcolor: 'background.paper',
    //     position: 'relative',
    //     overflow: 'auto',
    //     maxHeight: 300,
    //     '& ul': { padding: 0 },
    //   }}
    //   subheader={<li />}
    // >
    //   {[0, 1, 2, 3, 4].map((sectionId) => (
    //     <li key={`section-${sectionId}`}>
    //       <ul>
    //         <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
    //         {[0, 1, 2].map((item) => (
    //           <ListItem key={`item-${sectionId}-${item}`}>
    //             <ListItemText primary={`Item ${item}`} />
    //           </ListItem>
    //         ))}
    //       </ul>
    //     </li>
    //   ))}
    // </List>
  );
}

export default BetList;
