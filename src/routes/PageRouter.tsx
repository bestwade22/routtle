
import HeaderLayout from '@/components/HeaderLayout';
import Home from '@/pages/Home';
import Setting from '@/pages/Setting';
import React from 'react';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom';

interface PageRouterProps {}

const PageRouter: React.FC<PageRouterProps> = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HeaderLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
          // errorElement: isAuthenticated?<ForbiddenPage />:<ErrorPage/>,
        },
        {
          path: '/setting',
          element: <Setting />,
        },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
};

const MemoizedPageRouter = React.memo(PageRouter);

export default MemoizedPageRouter;
