import { createTheme } from '@mui/material/styles';

export const shades = {
  primary: {
    100: '#cccccc',
    200: '#999999',
    300: '#666666',
    400: '#333333',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },

  lotus: {
    50: '#fbf5f5',
    100: '#f7e9e9',
    200: '#f0d8d8',
    300: '#e5bcbc',
    400: '#d49595',
    500: '#c27171',
    600: '#ac5656',
    700: '#864141',
    800: '#783c3c',
    900: '#653737',
    950: '#351a1a',
  },

  secondary: {
    100: '#fcfeff',
    200: '#f9fdff',
    300: '#f6fbff',
    400: '#f3faff',
    500: '#f0f9ff',
    600: '#c0c7cc',
    700: '#909599',
    800: '#606466',
    900: '#303233',
  },
  purple: {
    100: '#fefdff',
    200: '#fdfbff',
    300: '#fcf9ff',
    400: '#fbf7ff',
    500: '#faf5ff',
    600: '#c8c4cc',
    700: '#969399',
    800: '#646266',
    900: '#323133',
  },
  sky: {
    100: '#fcfeff',
    200: '#f9fdff',
    300: '#f6fbff',
    400: '#f3faff',
    500: '#f0f9ff',
    600: '#c0c7cc',
    700: '#909599',
    800: '#606466',
    900: '#303233',
  },

  orange: {
    100: '#fffdfb',
    200: '#fffcf8',
    300: '#fffaf4',
    400: '#fff9f1',
    500: '#fff7ed',
    600: '#ccc6be',
    700: '#99948e',
    800: '#66635f',
    900: '#33312f',
  },
  neutral: {
    100: '#fefefe',
    200: '#fdfdfd',
    300: '#fcfcfc',
    400: '#fbfbfb',
    500: '#fafafa',
    600: '#c8c8c8',
    700: '#969696',
    800: '#646464',
    900: '#323232',
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[600],
      light: shades.primary[200],
    },
    secondary: {
      main: shades.secondary[500],
    },
    purple: {
      dark: shades.purple[700],
      main: shades.purple[400],
    },
    pink: {
      light: shades.lotus[200],
      main: shades.lotus[400],
      dark: shades.lotus[700],
    },
  },
  typography: {
    fontFamilly: ['Rubik', 'Fauna One'].join(','),
    fontSize: 12,
    h1: {
      fontFamilly: ['Cinzel', 'Fauna One'].join(','),
      fontSize: 36,
    },
    h2: {
      fontFamilly: ['Ubuntu', 'Fauna One'].join(','),
      fontSize: 24,
    },
  },
});
