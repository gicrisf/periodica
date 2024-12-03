import { useState, useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme, lightTheme } from './Themes';

import useAppStore from './store';
import Table from './Table';

function useSelectedTheme(themeName: string) {
  // Change theme according to its name
  // The alternative is storing the whole theme in Zustand
  // This would let us avoid zustand at all
  const [ theme, selectTheme ] = useState(lightTheme);
  useEffect(() => {
    switch (themeName) {
      case "light":
        selectTheme(lightTheme);
        break;
      case "dark":
        selectTheme(darkTheme);
        break;
      default:
        selectTheme(lightTheme);
    };
  }, [themeName]);

  return theme;
}

function App() {
  const { selected, themeName } = useAppStore();
  const theme = useSelectedTheme(themeName);

  // Debugging effects
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Table />
      </ThemeProvider>
    </>
  )
}

export default App;
