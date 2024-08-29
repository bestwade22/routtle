import Header from '@/components/Header';
import { useRouletteContext } from '@/contexts/RouletteContext';
import { setCookie } from '@/utils/handleCookie';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const BetDialog = () => {
  const { state, dispatch } = useRouletteContext();

  useEffect(() => {
    const onBeforeUnload = (ev: any) => {
      setCookie('state', JSON.stringify(state));
      return;
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [state]);

  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};
export default BetDialog;
