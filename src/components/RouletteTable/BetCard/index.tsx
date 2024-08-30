import { useRouletteContext } from '@/contexts/RouletteContext';
import { betProbability } from '@/utils/betUtils';
import { percentage } from '@/utils/percentage';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

type BetCardPropsType = {
  title: string;
  betId: string;
  records?: number[];
  betCount: number[];
};

const BetCard = (props: BetCardPropsType) => {
  const { title, betId, records, betCount } = props;
  const { state, dispatch } = useRouletteContext();
  const recordLength = records?.length || 1;
  useEffect(() => {
    return () => {};
  }, [state]);

  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {`Absent: ${betCount[0]}, Hit: ${betCount[1]}/${recordLength} (${percentage(betCount[1], recordLength)})`}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {`${betId} - ${betProbability(betId)}`}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default BetCard;
