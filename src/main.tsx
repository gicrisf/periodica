import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, type DataRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import Layout from './Dashboard';
import Table from './Table';
import Mock from './Mock';

const router: DataRouter = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: Table,
          },
          {
            path: 'settings',
            Component: Mock,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
