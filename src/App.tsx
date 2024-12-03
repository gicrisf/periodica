import { useState, useEffect } from 'react';

// TODO Integrate when the guys at MUI publish the new version
// https://github.com/mui/toolpad/issues/4270
// import { AppProvider, type Navigation } from '@toolpad/core/react-router-dom';

// In the meantime,
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';

// TODO Remove me asap (you're using a quick placeholder icon)
import Box from '@mui/material/Box';

import { basicTheme } from './Themes';
import useAppStore from './store';
import Table from './Table';

// Do I actually need routing?
const navigation: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'table',
    title: 'Table',
    icon: <DashboardIcon />,
  }
  /* {
   *   segment: 'page-2',
   *   title: 'Page 2',
   * }, */
];

function useSelectedTheme(themeName: string) {
  // Change theme according to its name
  // The alternative is storing the whole theme in Zustand
  // This would let us avoid zustand at all
  const [ theme, selectTheme ] = useState(basicTheme);
  useEffect(() => {
    switch (themeName) {
      case "basic":
        selectTheme(basicTheme);
        break;
      default:
        selectTheme(basicTheme);
    };
  }, [themeName]);

  return theme;
}


function App() {
  const { themeName } = useAppStore();
  const theme = useSelectedTheme(themeName);

  // Debugging effects
  // Get `selected` from store when you uncomment
  /* useEffect(() => {
   *   console.log(selected);
   * }, [selected]); */

  return (
    <>
      <AppProvider
        navigation={navigation}
        theme={theme}
        branding={{
          logo: <Box sx={{ padding: '8px' }}><DashboardIcon/></Box>,
          title: 'Periodica'
        }}
      >
        <DashboardLayout defaultSidebarCollapsed>
          <Table />
        </DashboardLayout>
      </AppProvider>
    </>
  )
}

export default App;
