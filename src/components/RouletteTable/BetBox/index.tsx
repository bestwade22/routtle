import { percentage } from '@/utils/percentage';
import { Box } from '@mui/material';

interface BetBoxPropsType {
  handleClickBetBox?: Function;
  title: string;
  count?: number[];
  noticeCount?: number;
  bgColor?: string;
  listLength?: number;
}
function BetBox(props: BetBoxPropsType) {
  const {
    title,
    count = [0, 0],
    bgColor,
    handleClickBetBox = () => false,
    noticeCount = 0,
    listLength = 0,
  } = props;

  const bg = () => {
    if (count[0] >= noticeCount && noticeCount > 0) {
      return 'yellow';
    }
    return bgColor || '#fff';
  };
  return (
    <Box
      display="flex"
      height={'100%'}
      width={'100%'}
      minHeight={'40px'}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{
        backgroundColor: bg(),
        color: bgColor ? '#fff' : '#000',
        border: 'solid 0.5px #000',
        
      }}
      onClick={() => handleClickBetBox()}
    >
      <Box fontSize={'0.8rem'}>
        {title}{` (${count[0]}) `}
      </Box>
      <Box fontSize={'0.7rem'}>{listLength ? `[${percentage(count[1], listLength)}]` : ''}</Box>
    </Box>
  );
}

export default BetBox;
