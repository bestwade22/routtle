import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import NumberInput from '@/components/Common/NumberInput';
import BackButton from '@/components/Common/Buttons/BackButton';
import { useRouletteContext } from '@/contexts/RouletteContext';
function AlertSetting() {
  const [checked, setChecked] = React.useState(['wifi']);
  const { state, dispatch } = useRouletteContext();
  const AbsentCheckState = state.settings.absentCheck;
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <BackButton path="/setting" title="Alert Settings" />

      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        //subheader={<ListSubheader>Alert Settings</ListSubheader>}
      >
        <ListItem>
          <ListItemText id="switch-list-label-bluetooth" primary="" />
          <Typography
            variant="subtitle2"
            display="block"
            sx={{ width: '125px', textAlign: 'center' }}
          >
            Yellow Alert
          </Typography>
          <Typography
            variant="subtitle2"
            display="block"
            sx={{ width: '125px', textAlign: 'center' }}
          >
            Red Alert
          </Typography>
        </ListItem>
        {AbsentCheckState.map((item: any) => {
          return (
            <ListItem>
              <ListItemText primary={item.title} />
              <NumberInput aria-label="alert yellow"  onChange={(event, val) => console.log(val)}/>
              <NumberInput aria-label="alert red" value={item.check[1]} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default AlertSetting;
