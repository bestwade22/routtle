import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import { useNavigate } from 'react-router-dom';

function setting() {
  const navigator = useNavigate();

  const handleListOnclick = (path: string) => {
    navigator(path);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItemButton onClick={() => handleListOnclick('/setting/alert')}>
        <ListItemIcon>
          <EditNotificationsIcon />
        </ListItemIcon>
        <ListItemText key={'Settings'} primary="Alert Settings" />
      </ListItemButton>
    </List>
  );
}

export default setting;
