import HeaderLayout from '@/components/HeaderLayout';
import Home from '@/pages/Home/index.tsx';
import Setting from '@/pages/Setting';
import AlertSetting from '@/pages/Setting/AlertSetting';
import React from 'react';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
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
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Setting />,
            },
            {
              path: 'alert',
              element: <AlertSetting />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

const MemoizedPageRouter = React.memo(PageRouter);

export default MemoizedPageRouter;
