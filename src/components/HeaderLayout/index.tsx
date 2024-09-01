import Header from '@/components/Header';
import { useRouletteContext } from '@/contexts/RouletteContext';
import {
  jsEraseCookie,
  jsSetCookie,
  removeCookie,
  setCookie,
} from '@/utils/handleCookie';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const HeaderLayout = () => {
  const { state, dispatch } = useRouletteContext();

  useEffect(() => {
    var isOnIOS =
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPhone/i);
    var eventName = isOnIOS ? 'pagehide' : 'beforeunload';
    const onBeforeUnload = (ev: any) => {
      setCookie('state', JSON.stringify(state));
      removeCookie('username', '')
      //jsEraseCookie('state')
      //jsEraseCookie('username')
      return;
    };
    window.addEventListener(eventName, onBeforeUnload);
    return () => {
      window.removeEventListener(eventName, onBeforeUnload);
    };
  }, [state]);

  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};
export default HeaderLayout;
