import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
const App = React.lazy(() => import("./App"));
const Layout = React.lazy(() => import("./Dashboard"));
const Table = React.lazy(() => import("./Table"));
const Plot = React.lazy(() => import("./Plot"));
// TODO
// const Pie = React.lazy(() => import("./Pie"));

const router = createBrowserRouter([
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
                  Component: Plot,
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
