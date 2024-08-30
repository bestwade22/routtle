import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useRouletteContext } from '@/contexts/RouletteContext';
import { defaultDialog } from '@/static/defaultContents';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const { state, dispatch } = useRouletteContext();
  const dialogState = state.dialog;
  const handleClose = () => {
    const payload = { stateName: 'dialog', value: defaultDialog };
    dispatch({
      type: 'UPDATE_SETTING_CHECK',
      payload: payload,
    });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogState.enable}
      >
        {dialogState.title && (
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {dialogState.title}
          </DialogTitle>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{dialogState.content}</DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
