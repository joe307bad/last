import React from 'react';
import { useEffect } from 'react';
import { Box, useThemeUI } from 'theme-ui';
import Head from './Head';
import Style from './Style';
import Main from '../ui/Main';
import Footer from '../ui/Footer';
import { useColorMode } from 'theme-ui';
import Header from '../ui/Header';
import Nav from '../ui/Nav';
import { children } from 'hastscript/lib/jsx-classic';

const Layout = (props) => {
  const [color, setColorMode] = useColorMode();
  const { theme } = useThemeUI();
  useEffect(() => {
    // the theme styles will be applied by theme ui after hydration, so remove the inline style we injected on page load
    document.body.removeAttribute('style');
    setColorMode('lite');
  }, []);

  return (
    <>
      <Head {...props} />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            maxWidth: 1000,
            margin: "0 auto"
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Nav />
          </Box>
          <Box
            sx={{
              flex: 1,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Main>{props.children}</Main>
          </Box>
        </Box>

        <Style />
      </Box>
    </>
  );
};

export default Layout;
