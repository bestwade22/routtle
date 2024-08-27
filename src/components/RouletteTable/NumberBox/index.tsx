import { absentBgColor } from '@/utils/absentBgColor';
import { percentage } from '@/utils/percentage';
import { Box } from '@mui/material';

interface NumberBoxPropsType {
  handleAddRecord: Function;
  num: number;
  count?: number[];
  color: string;
  listLength?: number;
  absentCheck?: number[];
}
function NumberBox(props: NumberBoxPropsType) {
  const {
    num,
    color,
    handleAddRecord,
    count = [0, 0],
    listLength = 0,
    absentCheck = [0, 0],
  } = props;

  const absentBg = absentBgColor(count[0], absentCheck)

  const addRecord = () => {
    console.log(num);
  };
  return (
    <Box
      display="flex"
      height={'40px'}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{
        backgroundColor: absentBg? absentBg : color,
        color: '#fff',
        border: 'solid 0.5px #fff',
      }}
      onClick={() => handleAddRecord()}
    >
      <Box fontSize={'0.8rem'}>
        {num}
        {` (${count[0]}) `}
      </Box>
      <Box fontSize={'0.7rem'}>
        {listLength ? `[${percentage(count[1], listLength)}]` : ''}
      </Box>
    </Box>
  );
}

export default NumberBox;
