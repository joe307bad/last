export default {
  useCustomProperties: true,
  useColorSchemeMediaQuery: true,
  config: {
    initialColorModeName: 'light',
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
    heading: 'Open Sans, serif',
  },
  fontSizes: [
    16, 18, 20, 24, 30, 36, 40, 48, 64, 72, 96,
  ],
  fontWeights: {
    lite: 200,
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  styles: {
    a: {
      padding: 0,
      cursor: "pointer"
    },
  },
  colors: {
    primary: '#ED6A5A',
    secondary: '#36C9C6',
    background: '#fff',
    background_2: '#fff',
    text: '#1b1e21',
    blue: '#4169e1',
    cyan: '#41b9e1',
    gray: '#667788',
    green: '#27a727',
    purple: '#6941e1',
    orange: '#fba100',
    pink: '#e141b9',
    red: '#ee5555',
    white: '#fff',
    yellow: '#FFDD22',
    lite: '#eee',
    modes: {
      light: {
      },
      dark: {
        background_2: '#121316',
        secondary: '#F4F1BB',
        text: '#fff',
        background: '#2F323A',
        lite: '#333',
      },
    },
  },
  space: [0, 4, 8, 16, 32, 64, 128],
  breakpoints: ['32em', '48em', '64em', '80em'],
  radii: [0, 3, 6],
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl':
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
  },
};
