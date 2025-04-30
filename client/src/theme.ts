// src/theme.ts
import { createTheme } from '@mui/material/styles';
const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Default MUI blue
    },
    // Add other palette colors if needed
  },
  shadows: [...defaultTheme.shadows], // Fix for shadows issue
});

export default theme;