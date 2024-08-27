import { DataGrid } from '@mui/x-data-grid';
type BetListType = {
  rows: any;
  columns: any;
};

function BetList(props: BetListType) {
  const { rows, columns } = props;
  return (
    <div style={{ height: '15rem', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
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
