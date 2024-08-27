import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeaderNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigator = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
          <List sx={{ width: 250 }} >
            <ListItem button onClick={() => navigator('/')}>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem button onClick={() => navigator('/setting')}>
              <ListItemText primary="Setting" />
            </ListItem>
          </List>
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Title
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderNav;
