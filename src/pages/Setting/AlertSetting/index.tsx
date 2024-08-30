import { List, ListItem, ListItemText, Typography } from '@mui/material';
import NumberInput from '@/components/Common/NumberInput';
import BackButton from '@/components/Common/Buttons/BackButton';
import { useRouletteContext } from '@/contexts/RouletteContext';
function AlertSetting() {
  const { state, dispatch } = useRouletteContext();
  const AbsentCheckState = state.settings.absentCheck;

  const handleNumInputChange = (
    value: number | null = 0,
    index: number,
    betId: string
  ) => {
    const payload = { checkNumber: value, betId: betId, numIndex: index };
    dispatch({
      type: 'UPDATE_SETTING_CHECK',
      payload: payload,
    });
  };

  return (
    <>
      <BackButton path="/setting" title="Alert Settings" />

      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        //subheader={<ListSubheader>Alert Settings</ListSubheader>}
      >
        <ListItem key={'header'}>
          <ListItemText key={'header'} id="header" primary="" />
          <Typography
            variant="subtitle2"
            display="block"
            bgcolor={'#C0C0C0'}
            sx={{ width: '125px', textAlign: 'center' }}
          >
            Silver Alert
          </Typography>
          <Typography
            variant="subtitle2"
            display="block"
            bgcolor={'#FFD700'}
            sx={{ width: '125px', textAlign: 'center' }}
          >
            Gold Alert
          </Typography>
        </ListItem>
        {AbsentCheckState.map((item: any, index) => {
          return (
            <ListItem key={index}>
              {/* <Typography variant="body2" display="block">
                {item.title}
              </Typography> */}
              <ListItemText key={index} primary={item.title} />
              <NumberInput
                aria-label="alert silver"
                value={item.check[0]}
                onChange={(event, val) => handleNumInputChange(val, 0, item.id)}
              />
              <NumberInput
                aria-label="alert gold"
                value={item.check[1]}
                onChange={(event, val) => handleNumInputChange(val, 1, item.id)}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default AlertSetting;
