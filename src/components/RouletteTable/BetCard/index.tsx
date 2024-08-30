import { useRouletteContext } from '@/contexts/RouletteContext';
import { useEffect } from 'react';

const BetCard = () => {
  const { state, dispatch } = useRouletteContext();

  useEffect(() => {
    return () => {
    };
  }, [state]);

  return (
    <>
    abcd
    </>
  );
};
export default BetCard;
