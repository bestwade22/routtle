import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const HeaderLayout = () => (
  <>
    <Header>
    </Header>
    <Outlet />
  </>
);
export default HeaderLayout;
