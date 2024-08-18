import { Box } from '@mui/material';

interface NumberBoxPropsType {
  handleAddRecord: Function;
  num: number;
  count?: number;
  color: string;
}
function NumberBox(props: NumberBoxPropsType) {
  const { num, color, handleAddRecord, count = 0 } = props;
  const addRecord = () => {
    console.log(num);
  };
  return (
    <Box
      display="flex"
      height={'40px'}
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: color,
        color: '#fff',
        border: 'solid 0.5px #fff',
      }}
      onClick={() => handleAddRecord()}
    >
      {num}
      {` (${count})`}
    </Box>
  );
}

export default NumberBox;
