
import Home from '@/pages/Home';
import React from 'react';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom';

interface PageRouterProps {}

const PageRouter: React.FC<PageRouterProps> = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '/*',
          element: <Home />,
          // errorElement: isAuthenticated?<ForbiddenPage />:<ErrorPage/>,
        },
      ],
    }
  ]);

  return <RouterProvider router={router} />;
};

const MemoizedPageRouter = React.memo(PageRouter);

export default MemoizedPageRouter;
