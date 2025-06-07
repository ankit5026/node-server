import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: { main: '#1877F2' }, // Facebook blue
    secondary: { main: '#42B72A' }, // Facebook green
    background: { default: '#F0F2F5' }, // Light gray
  },
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    button: { textTransform: 'none' } // No uppercase buttons
  },
});