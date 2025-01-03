import * as React from 'react';
import { useState, useEffect } from 'react';

// MUI
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// TODO Remove me asap (you're using a quick placeholder icon)
import Box from '@mui/material/Box';

// TODO Integrate when the guys at MUI publish the new version
// https://github.com/mui/toolpad/issues/4270
// import { AppProvider, type Navigation } from '@toolpad/core/react-router-dom';
// In the meantime,
import { AppProvider } from '@toolpad/core/react-router-dom';
import { type Navigation } from '@toolpad/core/AppProvider';

import { Outlet } from 'react-router-dom';

// Internals
import { basicTheme } from './Themes';
import useAppStore from './store';

const navigation: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <ShoppingCartIcon />,
  },
];

const App: React.FC = () => {
  const { themeName } = useAppStore();
  const [ theme, selectTheme ] = useState(basicTheme);

  // Use selected theme
  useEffect(() => {
    switch (themeName) {
      case "basic":
        selectTheme(basicTheme);
        break;
      default:
        selectTheme(basicTheme);
    };
  }, [themeName]);

  // Debugging effects
  // Get `selected` from store when you uncomment
  /* useEffect(() => {
   *   console.log(selected);
   * }, [selected]); */

  return (
    <AppProvider
      navigation={navigation}
      theme={theme}
      branding={{
        logo: <Box sx={{ padding: '8px' }}><DashboardIcon/></Box>,
        title: 'Periodica'
      }}
    >
      <Outlet />
    </AppProvider>
  )
}

export default App;
