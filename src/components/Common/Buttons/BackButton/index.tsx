import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

type BackButtonType = {
  path: string;
  title?: string;
};

function BackButton(props: BackButtonType) {
  const { path, title } = props;
  const navigator = useNavigate();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ ml:1, flex: 1, justifyContent: 'left' }}
          onClick={() => navigator(path)}
        >
          <ArrowBackIcon />
        </IconButton>
        {title && (
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            {title}
          </Typography>
        )}
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </>
  );
}

export default BackButton;
