import { useRouletteContext } from '@/contexts/RouletteContext';
import { betCalculator } from '@/utils/betUtils';
import { hitCounts } from '@/utils/count';
import { percentage, powPercentage } from '@/utils/percentage';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

type BetCardPropsType = {
  title: string;
  betId: string;
  betIndex: number;
  records?: number[];
  betCount: number[];
};

const BetCard = (props: BetCardPropsType) => {
  const { title, betId, records, betCount, betIndex } = props;
  const { state, dispatch } = useRouletteContext();
  const recordLength = records?.length || 1;
  useEffect(() => {
    return () => {};
  }, [state]);
  const betDetail = betCalculator(betId);

  const betInfo = [
    {
      title: 'Absent percentage',
      content: powPercentage(betDetail.missRate, betCount[0], 5),
    },
    {
      title: 'Hit Counts',
      content: hitCounts(records, betId, betIndex).map((count, i) => (
        <Box>{`${(i + 1) * 10} - ${count} (${percentage(count, ((i + 1) * 10))})`}</Box>
      )),
    },
  ];

  return (
    <Card sx={{ minWidth: 275, boxShadow: 'none' }}>
      <CardContent sx={{ p: 0 }}>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {`Absent: ${betCount[0]}, Hit: ${
            betCount[1]
          }/${recordLength} (${percentage(betCount[1], recordLength)})`}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {`${betId} - ${betDetail.percentage}`}
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {betInfo.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Typography gutterBottom variant="subtitle2" component="div">
                {item.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {item.content}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
export default BetCard;
