import { Box } from '@mui/material';

interface BetBoxPropsType {
  handleClickBetBox?: Function;
  title: string;
  count?: number;
  noticeCount?: number;
  bgColor?: string;
}
function BetBox(props: BetBoxPropsType) {
  const {
    title,
    count = 0,
    bgColor,
    handleClickBetBox = () => false,
    noticeCount = 0,
  } = props;

  const bg = () => {
    if(count >= noticeCount && noticeCount > 0){
      return 'yellow';
    }
    return bgColor || '#fff'
  }
  return (
    <Box
      display="flex"
      height={'100%'}
      width={'100%'}
      minHeight={'40px'}
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: bg(),
        color: bgColor? '#fff':'#000',
        border: 'solid 0.5px #000',
        fontSize: '10px'
      }}
      onClick={() => handleClickBetBox()}
    >
      {title}{` (${count})`}
    </Box>
  );
}

export default BetBox;
