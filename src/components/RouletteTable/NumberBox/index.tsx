import { Box } from '@mui/material';

interface NumberBoxPropsType  {
  handleAddRecord: Function;
  num: number;
  color: string;
}
function NumberBox(props: NumberBoxPropsType) {
  const { num, color, handleAddRecord } = props;
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
    </Box>
  );
}

export default NumberBox;
