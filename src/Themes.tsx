import { createTheme } from '@mui/material/styles';

export const basicTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 500,
      lg: 1200,
      xl: 1536,
    },
  },
});
